
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

from setting import Settings
from llms.llm_manager import llm_manager
from prompt.promt_config import PromptConfig

class Agent():
    def __init__(self, Settings):
        self.Settings = Settings
        self.llm_manager = llm_manager
        default_url = "http://host.docker.internal:11434" if os.getenv("DOCKER_ENV") == "true" else "http://localhost:11434"
        ollama_url = os.getenv("OLLAMA_URL",  self.Settings.OLLAMA_BASE_URL or default_url)
        self.client = llm_manager.get_ollama_client(
            base_url=ollama_url,
            model_name=self.Settings.OLLAMA_MODEL
        )
        self.current_message = []
        self.last_message = []
        self.prompt_config = PromptConfig()
    
    def _strip_think(self, text: str) -> str:
        """Remove <think>...</think> sections and trim whitespace."""
        if not text:
            return text
        # Support nested or multiple occurrences
        import re
        cleaned = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL | re.IGNORECASE)
        return cleaned.strip()
    
    def classify_intent(self, message: str) -> str:
        classification_prompt = self.prompt_config.get_prompt("classification_agent_intent", user_input=message)
        intent = self.client.generate_content([{"role": "user", "content": classification_prompt}])
        intent = self._strip_think(intent)
        message = {
            "message": message,
            "intent": intent
        }
        return message
    
    def extract_feature_question(self, message) -> str:
        if(message["intent"] == "intent_jd"):
            feature_prompt = self.prompt_config.get_prompt("extract_feature_question_about_jd", user_input=message["message"])
            feature = self.client.generate_content([{"role": "user", "content": feature_prompt}])
            return feature
        
        

if __name__ == "__main__":
    settings = Settings.load_settings()
    agent = Agent(settings)
    message = agent.classify_intent("Tìm công việc Backend tại Hà Nội")
    print("Message:", message)
    feature = agent.extract_feature_question(message)
    print("Feature:", feature)
