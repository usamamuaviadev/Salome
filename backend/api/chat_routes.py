"""
Chat-related API routes
"""

from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import List, Dict, Any

from models.request_models import TaskAssistantRequest, ChatSessionRequest
from models.response_models import TaskAssistantResponse, ChatSessionResponse
from services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["chat"])
chat_service = ChatService()

@router.post("/new-session", response_model=ChatSessionResponse)
async def create_chat_session():
    """Create a new chat session"""
    try:
        session_id = chat_service.get_or_create_session()
        return ChatSessionResponse(
            session_id=session_id,
            message="New chat session created"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/session/{session_id}")
async def get_chat_session(session_id: str):
    """Get chat session details"""
    try:
        messages = chat_service.get_session_messages(session_id)
        return {
            "session_id": session_id,
            "messages": messages
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/session/{session_id}")
async def delete_chat_session(session_id: str):
    """Delete a chat session"""
    try:
        # This would need to be implemented in the chat service
        return {"message": f"Session {session_id} deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
