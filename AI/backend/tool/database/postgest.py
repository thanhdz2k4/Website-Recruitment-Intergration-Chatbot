import os
import sys
from pathlib import Path
from supabase import create_client, Client
from typing import List, Dict, Any
import logging
import uuid

# Add backend to path for LLMManager import
backend_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(backend_dir))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class PostgreSQLClient:
    """
    PostgreSQL client using Supabase for company and job data management with Qdrant embedding capabilities
    """
    def __init__(self, Settings=None):
        """
        Khởi tạo Supabase client và Qdrant client
        Args:
            url: Supabase URL
            key: Supabase anon key
            qdrant_url: Qdrant URL
            qdrant_api_key: Qdrant API key
        """
        # Khởi tạo Supabase
        self.url = Settings.SUPABASE_URL
        self.key = Settings.SUPABASE_ANON_KEY

        if not self.url or not self.key:
            raise ValueError("SUPABASE_URL và SUPABASE_ANON_KEY phải được cung cấp")
            
        self.client: Client = create_client(self.url, self.key)
        logger.info("✅ Supabase client initialized successfully")
        


    def get_data_from_procedures(self, name_of_procedure: str, limit: int = 100) -> List[Dict[str, Any]]:
        """
        Lấy dữ liệu từ stored procedure
        Args:
            limit: số lượng bản ghi tối đa
        Returns:
            List[Dict]: danh sách công ty với ngành nghề
        """
        try:
            response = self.client.rpc(name_of_procedure).execute()
       
            if response.data:
                logger.info(f"✅ Retrieved {len(response.data)} records")
                return response.data
            else:
                return self._get_companies_fallback(limit)
                
        except Exception as e:
            logger.error(f"❌ Error getting {str(e)}")
            return self._get_companies_fallback(limit)

    

    

   
    

    