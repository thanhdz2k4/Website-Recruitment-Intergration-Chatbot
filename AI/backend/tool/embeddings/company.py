"""Utilities for syncing company embeddings into Qdrant."""
from __future__ import annotations

import logging
from typing import Any, Dict, List, Optional
import uuid

from qdrant_client.models import Distance, PointStruct, VectorParams

from setting import Settings
from tool.database import PostgreSQLClient, QDrant

from .base import EmbeddingConfig
from .sentenceTransformer import SentenceTransformerEmbedding

logger = logging.getLogger(__name__)


def _build_company_text(record: Dict[str, Any]) -> str:
    """Build a single descriptive string used for embedding a company record."""
    parts: List[str] = []

    name = record.get("name")
    if name:
        parts.append(f"Company name: {name}")

    website = record.get("website")
    if website:
        parts.append(f"Website: {website}")

    size = record.get("size")
    if size:
        parts.append(f"Company size: {size}")

    description = record.get("description")
    if description:
        parts.append(f"Description: {description}")

    addresses = record.get("addresses")
    if addresses:
        parts.append(f"Locations: {addresses}")

    industries = record.get("industries")
    if industries:
        parts.append(f"Industries: {industries}")

    return ". ".join(parts).strip()


def _ensure_collection(client, collection_name: str, vector_size: int) -> None:
    """Ensure the Qdrant collection exists and matches the expected vector size."""
    try:
        collection = client.get_collection(collection_name=collection_name)
        existing_size: Optional[int] = None

        try:
            vectors = collection.config.params.vectors  # type: ignore[attr-defined]
            if isinstance(vectors, VectorParams):
                existing_size = vectors.size
            elif isinstance(vectors, dict):
                existing_size = vectors.get("size")
        except AttributeError:
            existing_size = None

        if existing_size and existing_size != vector_size:
            logger.info(
                "Qdrant collection '%s' has size %s, recreating with size %s",
                collection_name,
                existing_size,
                vector_size,
            )
            client.recreate_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(
                    size=vector_size,
                    distance=Distance.COSINE,
                ),
            )
            logger.info(
                "Recreated Qdrant collection '%s' with vector size %s",
                collection_name,
                vector_size,
            )
        return
    except Exception:
        logger.info("Qdrant collection '%s' missing. Creating...", collection_name)

    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(
            size=vector_size,
            distance=Distance.COSINE,
        ),
    )
    logger.info("Created Qdrant collection '%s' with vector size %s", collection_name, vector_size)


def _resolve_embedding_model(model_name: str) -> SentenceTransformerEmbedding:
    """Get a sentence transformer embedding model, preferably via the model manager cache."""
    embedding_model: Optional[SentenceTransformerEmbedding] = None

    try:
        from tool.model_manager import model_manager  # Local import to avoid circular dependency

        embedding_model = model_manager.get_embedding_model(model_name)
    except Exception as error:  # pragma: no cover - fallback path
        logger.debug("Falling back to direct sentence transformer load: %s", error)

    if embedding_model is None:
        config = EmbeddingConfig(name=model_name)
        embedding_model = SentenceTransformerEmbedding(config)

    return embedding_model


def sync_company_embeddings(
    settings: Optional[Settings] = None,
    *,
    collection_name: Optional[str] = None,
    batch_size: int = 64,
    limit: Optional[int] = None,
) -> Dict[str, Any]:
    """Fetch company data from PostgreSQL and upsert embeddings into Qdrant.

    Args:
        settings: Application settings instance. If omitted, settings will be loaded lazily.
        collection_name: Override for the Qdrant collection name.
        batch_size: Number of vectors to upsert per request.
        limit: Maximum number of companies to fetch from the procedure.

    Returns:
        A dictionary summarising the sync results.
    """

    settings = settings or Settings.load_settings()
    collection = collection_name or getattr(settings, "COLLECTION_COMPANY", "companies")
    procedure_name = "get_company_infor"

    pg_client = PostgreSQLClient(Settings=settings)
    companies = pg_client.get_data_from_procedures(procedure_name, limit=limit or 1000)

    if not companies:
        logger.info("No company records returned from procedure '%s'", procedure_name)
        return {
            "status": "empty",
            "collection": collection,
            "records": 0,
            "upserted": 0,
        }

    embedding_model = _resolve_embedding_model(settings.TEXT_EMBEDDING_MODEL_ID)

    try:
        embedding_dim = embedding_model.embedding_model.get_sentence_embedding_dimension()
    except AttributeError:  # pragma: no cover - fallback for custom models
        sample_vector = embedding_model.encode("sample text")
        if hasattr(sample_vector, "tolist"):
            sample_vector = sample_vector.tolist()
        embedding_dim = len(sample_vector)

    configured_size = getattr(settings, "QDRANT_VECTOR_SIZE", embedding_dim)
    if configured_size != embedding_dim:
        logger.info(
            "Embedding dimension %s differs from configured %s; using embedding dimension",
            embedding_dim,
            configured_size,
        )

    vector_size = embedding_dim

    qdrant = QDrant(Settings=settings)
    qdrant_client = qdrant.get_client()
    _ensure_collection(qdrant_client, collection, vector_size)

    points: List[PointStruct] = []
    skipped: List[int] = []

    for record in companies:
        company_id = record.get("company_id")
        if company_id is None:
            skipped.append(company_id)
            continue

        text = _build_company_text(record)
        if not text:
            skipped.append(company_id)
            continue

        vector = embedding_model.encode(text)
        if hasattr(vector, "tolist"):
            vector = vector.tolist()

        if not isinstance(vector, list):
            vector = list(vector)

        payload = {
            "company_id": company_id,
            "name": record.get("name"),
            "website": record.get("website"),
            "size": record.get("size"),
            "description": record.get("description"),
            "addresses": record.get("addresses"),
            "industries": record.get("industries"),
        }

        point_id = company_id
        if isinstance(point_id, str) and not point_id.strip():
            point_id = str(uuid.uuid4())
        elif not isinstance(point_id, (str, int)):
            point_id = str(point_id)

        points.append(
            PointStruct(
                id=point_id,
                vector=vector,
                payload=payload,
            )
        )

    if not points:
        logger.warning("No valid company records to upsert into Qdrant")
        return {
            "status": "skipped",
            "collection": collection,
            "records": len(companies),
            "upserted": 0,
            "skipped_ids": skipped,
            "vector_dim": vector_size,
        }

    total_upserted = 0
    for start in range(0, len(points), batch_size):
        batch = points[start : start + batch_size]
        qdrant_client.upsert(collection_name=collection, points=batch)
        total_upserted += len(batch)

    logger.info(
        "Upserted %s company embeddings into collection '%s'", total_upserted, collection
    )

    result: Dict[str, Any] = {
        "status": "success",
        "collection": collection,
        "records": len(companies),
        "upserted": total_upserted,
        "vector_dim": vector_size,
    }

    if skipped:
        result["skipped_ids"] = skipped

    return result


__all__ = ["sync_company_embeddings"]
