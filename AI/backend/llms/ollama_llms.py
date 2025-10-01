# -*- coding: utf-8 -*-
import ollama
import requests
import json
import logging
from typing import List, Dict, Optional, Callable, Any, Union
from .base import BaseLLM
from .tools import AVAILABLE_TOOLS, get_tool_by_name


class OllamaLLMs(BaseLLM):
    # Class-level cache để tránh multiple warm-up
    _warmed_models = set()  # Cache các models đã warm-up
    _client_cache = {}  # Cache các client instances
    
    def __init__(self, base_url: str = "http://localhost:11434", model_name: str = "llama2", **kwargs):
        """
        Ollama client với function calling support và connection optimization.
        base_url: URL Ollama server (mặc định: http://localhost:11434)
        model_name: tên model đã pull về trong Ollama
        """
        super().__init__(model_name=model_name, **kwargs)
        self.base_url = base_url.rstrip("/")
        
        # Create cache key
        self.cache_key = f"{base_url}#{model_name}"
        
        # Reuse existing client if available
        if self.cache_key in self.__class__._client_cache:
            cached_client = self.__class__._client_cache[self.cache_key]
            self.client = cached_client['client']
            self.session = cached_client['session']
            self.logger = cached_client['logger']
            self.logger.info(f"♻️ Reusing cached Ollama client for {model_name}")
        else:
            # Initialize new Ollama client with connection pooling
            self.client = ollama.Client(
                host=base_url,
                timeout=120  # Tăng timeout cho models lớn
            )
            
            # Tạo session với connection pooling cho HTTP requests
            self.session = requests.Session()
            self.session.headers.update({
                'Content-Type': 'application/json',
                'Connection': 'keep-alive'
            })
            
            # Setup logging
            self.logger = logging.getLogger(__name__)
            
            # Cache the client
            self.__class__._client_cache[self.cache_key] = {
                'client': self.client,
                'session': self.session,
                'logger': self.logger
            }
        
        # Only warm-up if not already warmed
        if self.cache_key not in self.__class__._warmed_models:
            self._ensure_model_loaded()
            self.__class__._warmed_models.add(self.cache_key)
        else:
            self.logger.info(f"⚡ Model {model_name} already warmed up, skipping...")
    
    def _ensure_model_loaded(self):
        """
        Đảm bảo model đã được load vào memory (warm-up)
        """
        try:
            # Gửi một request nhỏ để warm-up model
            warmup_response = self.client.chat(
                model=self.model_name,
                messages=[{"role": "user", "content": "Hi"}],
                options={"num_predict": 1}  # Chỉ generate 1 token
            )
            self.logger.info(f"🔥 Model {self.model_name} warmed up successfully")
        except Exception as e:
            self.logger.warning(f"⚠️ Model warm-up failed: {e}")
    
    def keep_alive(self, duration: int = 300):
        """
        Giữ model trong memory trong khoảng thời gian nhất định
        Args:
            duration: Thời gian giữ model (giây), -1 = vĩnh viễn
        """
        try:
            payload = {
                "model": self.model_name,
                "keep_alive": duration if duration > 0 else -1
            }
            self.session.post(f"{self.base_url}/api/generate", json=payload)
            self.logger.info(f"🔄 Model {self.model_name} keep-alive set to {duration}s")
        except Exception as e:
            self.logger.warning(f"⚠️ Keep-alive failed: {e}")

    def generate_content(self, prompt: List[Dict[str, str]]) -> str:
        """
        Generate content using the legacy API (backward compatibility)
        """
        messages = "\n".join([f"{p['role']}: {p['content']}" for p in prompt])

        payload = {
            "model": self.model_name,
            "prompt": messages,
            "stream": False,
        }

        resp = requests.post(
            f"{self.base_url}/api/generate",
            json=payload,
        )

        if resp.status_code != 200:
            raise ValueError(f"Ollama request failed: {resp.status_code}, {resp.text}")

        data = resp.json()
        return data.get("response", "")

    def chat(self, messages: List[Dict[str, str]], **options) -> str:
        """
        Chat using Ollama 0.4 API without tools
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            **options: Additional options (temperature, etc.)
        
        Returns:
            str: Generated response
        """
        
        try:
            response = self.client.chat(
                model=self.model_name,
                messages=messages,
                **options
            )
            return response['message']['content']
        except Exception as e:
            self.logger.error(f"Chat error: {e}")
            raise ValueError(f"Chat request failed: {str(e)}")

    def chat_with_tools(
        self, 
        messages: List[Dict[str, str]], 
        tools: Optional[List[Union[Callable, str]]] = None,
        max_steps: int = 3,
        **options
    ) -> Dict[str, Any]:
        """
        Chat with function calling support
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            tools: List of callable functions or tool names from registry
            max_steps: Maximum number of tool calling steps
            **options: Additional options (temperature, etc.)
        
        Returns:
            dict: Response with final answer and tool call history
        """
        if not tools:
            # No tools provided, use regular chat
            response = self.chat(messages, **options)
            return {
                "final_answer": response,
                "tool_calls": [],
                "steps": 1
            }
        
        # Convert tools to proper format
        tool_functions = self._prepare_tools(tools)
        
        current_messages = messages.copy()
        tool_call_history = []
        
        for step in range(max_steps):
            try:
                # Call Ollama with tools
                response = self.client.chat(
                    model=self.model_name,
                    messages=current_messages,
                    tools=tool_functions,
                    **options
                )
                
                message = response['message']
                
                # Check if model wants to use tools
                if not hasattr(message, 'tool_calls') or not message.tool_calls:
                    # No tool calls, return final answer
                    return {
                        "final_answer": message['content'],
                        "tool_calls": tool_call_history,
                        "steps": step + 1
                    }
                
                # Process tool calls
                current_messages.append({
                    "role": "assistant",
                    "content": message['content'] or ""
                })
                
                for tool_call in message.tool_calls:
                    tool_result = self._execute_tool_call(tool_call)
                    tool_call_history.append({
                        "tool_name": tool_call.function.name,
                        "arguments": tool_call.function.arguments,
                        "result": tool_result
                    })
                    
                    # Add tool result to conversation
                    current_messages.append({
                        "role": "tool",
                        "content": str(tool_result)
                    })
                
            except Exception as e:
                self.logger.error(f"Tool calling error at step {step}: {e}")
                return {
                    "final_answer": f"Error during tool execution: {str(e)}",
                    "tool_calls": tool_call_history,
                    "steps": step + 1,
                    "error": str(e)
                }
        
        # Max steps reached, try to get final answer
        try:
            current_messages.append({
                "role": "user",
                "content": "Please provide a final answer based on the information above."
            })
            
            final_response = self.client.chat(
                model=self.model_name,
                messages=current_messages,
                **options
            )
            
            return {
                "final_answer": final_response['message']['content'],
                "tool_calls": tool_call_history,
                "steps": max_steps,
                "max_steps_reached": True
            }
        except Exception as e:
            return {
                "final_answer": "Max steps reached and couldn't generate final answer",
                "tool_calls": tool_call_history,
                "steps": max_steps,
                "error": str(e)
            }
    
    def _prepare_tools(self, tools: List[Union[Callable, str]]) -> List[Callable]:
        """
        Convert tool names to actual functions
        
        Args:
            tools: List of functions or tool names
        
        Returns:
            list: List of callable functions
        """
        tool_functions = []
        
        for tool in tools:
            if callable(tool):
                tool_functions.append(tool)
            elif isinstance(tool, str):
                tool_func = get_tool_by_name(tool)
                if tool_func:
                    tool_functions.append(tool_func)
                else:
                    self.logger.warning(f"Tool '{tool}' not found in registry")
            else:
                self.logger.warning(f"Invalid tool type: {type(tool)}")
        
        return tool_functions
    
    def _execute_tool_call(self, tool_call) -> Any:
        """
        Execute a single tool call safely
        
        Args:
            tool_call: Tool call object from Ollama
        
        Returns:
            Any: Tool execution result
        """
        try:
            tool_name = tool_call.function.name
            tool_args = tool_call.function.arguments
            
            # Get the function from registry
            tool_func = get_tool_by_name(tool_name)
            if not tool_func:
                return {"error": f"Tool '{tool_name}' not found"}
            
            # Execute the tool with arguments
            result = tool_func(**tool_args)
            
            self.logger.info(f"Tool '{tool_name}' executed successfully")
            return result
            
        except Exception as e:
            error_msg = f"Error executing tool '{tool_name}': {str(e)}"
            self.logger.error(error_msg)
            return {"error": error_msg}
    
    def list_available_tools(self) -> List[str]:
        """
        Get list of available tool names
        
        Returns:
            list: List of tool names
        """
        return list(AVAILABLE_TOOLS.keys())
    
    @classmethod
    def clear_cache(cls):
        """Clear all cached clients and warm-up status"""
        cls._warmed_models.clear()
        cls._client_cache.clear()
        logging.getLogger(__name__).info("🧹 Cleared Ollama client cache")
    
    @classmethod
    def get_cache_info(cls) -> Dict[str, Any]:
        """Get information about cached clients"""
        return {
            "warmed_models": list(cls._warmed_models),
            "cached_clients": list(cls._client_cache.keys()),
            "cache_count": len(cls._client_cache)
        }
    
    def is_warmed_up(self) -> bool:
        """Check if this model instance is warmed up"""
        return self.cache_key in self.__class__._warmed_models
