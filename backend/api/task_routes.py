"""
Task-related API routes
"""

from fastapi import APIRouter, HTTPException
from datetime import datetime

from models.request_models import TaskAssistantRequest
from models.response_models import TaskAssistantResponse
from services.chat_service import ChatService

router = APIRouter(prefix="/task", tags=["task"])
chat_service = ChatService()

@router.post("/assistant", response_model=TaskAssistantResponse)
async def task_assistant(request: TaskAssistantRequest):
    """Main task assistant endpoint for AI-powered task help"""
    try:
        # Get or create session
        session_id = chat_service.get_or_create_session(request.session_id)
        
        # Get AI response
        ai_response = chat_service.get_ai_response(
            request.user_message, 
            request.conversation_history
        )
        
        # Get task suggestions
        task_suggestions = chat_service.get_task_suggestions()
        
        # Update session
        chat_service.update_session(session_id, request.user_message, ai_response)
        
        # Get updated conversation history
        conversation_history = chat_service.get_session_messages(session_id)
        
        return TaskAssistantResponse(
            user_message=request.user_message,
            ai_response=ai_response,
            task_suggestions=task_suggestions,
            timestamp=datetime.now().isoformat(),
            session_id=session_id,
            conversation_history=conversation_history
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
