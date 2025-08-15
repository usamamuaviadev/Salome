"""
Response models for the AI Task Assistant API
"""

from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

class TaskAssistantResponse(BaseModel):
    """Response model for task assistant endpoint"""
    user_message: str
    ai_response: str
    task_suggestions: List[str]
    timestamp: str
    session_id: str
    conversation_history: List[Dict[str, Any]]

class ChatSessionResponse(BaseModel):
    """Response model for chat session creation"""
    session_id: str
    message: str

class HealthResponse(BaseModel):
    """Response model for health check endpoint"""
    status: str
    timestamp: str
