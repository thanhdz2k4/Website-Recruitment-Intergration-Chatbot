
import sys
from pathlib import Path


# Add backend to path
backend_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(backend_dir))


if __name__ == "__main__":
    from tool.database import PostgreSQLClient
    from setting import Settings
    settings = Settings.load_settings()
    # postgreSQL_client = PostgreSQLClient(Settings=settings)
    # print(postgreSQL_client.get_data_from_procedures('get_company_infor'))
    from tool.database import QDrant
    from tool.embeddings import SentenceTransformerEmbedding, EmbeddingConfig

    settings = Settings.load_settings()

    # Construct EmbeddingConfig with the model name from settings
    config = EmbeddingConfig(name=settings.TEXT_EMBEDDING_MODEL_ID)
    embedding_model = SentenceTransformerEmbedding(config)
    query = embedding_model.encode("Tìm có ngành Software.")

    qdrant_client = QDrant(Settings=settings)
    print(qdrant_client.search_vectors("companies", query, 3))
        


   

