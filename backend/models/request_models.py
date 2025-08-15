"""
Request models for the AI Task Assistant API
"""

from pydantic import BaseModel
from typing import List, Optional

class TaskAssistantRequest(BaseModel):
    """Request model for task assistant endpoint"""
    user_message: str
    context: str = ""
    session_id: str = ""
    conversation_history: List[dict] = []

class ChatSessionRequest(BaseModel):
    """Request model for creating new chat sessions"""
    pass
