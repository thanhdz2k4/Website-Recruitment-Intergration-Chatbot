from pydantic.v1 import BaseModel, Field, validator
from typing import Any, Optional


class EmbeddingConfig(BaseModel):
    name: str = Field(..., description="The name of the SentenceTransformer model")

    @validator('name')
    def check_model_name(cls, value):
        if not isinstance(value, str) or not value.strip():
            raise ValueError("Model name must be a non-empty string")
        return value


class BaseEmbedding:
    """Base class for embedding providers.

    The constructor is flexible and accepts either:
      - an `EmbeddingConfig` instance
      - a raw model name string
      - a Settings-like object that exposes `EMBEDDING_MODE`
    """

    name: Optional[str]

    def __init__(self, Settings: Any = None):
        super().__init__()

        # If an EmbeddingConfig is passed, use its name
        if isinstance(Settings, EmbeddingConfig):
            self.name = Settings.name
            return

        # If a plain string (model name) is passed
        if isinstance(Settings, str):
            self.name = Settings
            return

        # Fallback: try to read EMBEDDING_MODE attribute (legacy Settings)
        try:
            self.name = getattr(Settings, "EMBEDDING_MODE")
        except Exception:
            self.name = None

    def encode(self, text: str):
        raise NotImplementedError("The encode method must be implemented by subclasses")


class APIBaseEmbedding(BaseEmbedding):
    baseUrl: Optional[str]
    apiKey: Optional[str]

    def __init__(self, name: str = None, baseUrl: str = None, apiKey: str = None):
        super().__init__(name)
        self.baseUrl = baseUrl
        self.apiKey = apiKey
