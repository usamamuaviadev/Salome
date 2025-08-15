"""
Chat service for managing chat sessions and AI interactions
"""

import os
import logging
import openai
from datetime import datetime
from typing import Dict, List, Any
from fastapi import HTTPException

logger = logging.getLogger(__name__)

class ChatService:
    """Service for managing chat sessions and AI interactions"""
    
    def __init__(self):
        """Initialize the chat service"""
        self.chat_sessions: Dict[str, Dict[str, Any]] = {}
        self.session_counter = 0
        
        # Load OpenAI API key
        openai.api_key = os.getenv("OPENAI_API_KEY")
        if not openai.api_key:
            logger.warning("OpenAI API key not configured")
    
    def get_or_create_session(self, session_id: str = "") -> str:
        """Get existing session ID or create new one"""
        if not session_id or session_id not in self.chat_sessions:
            self.session_counter += 1
            session_id = f"session_{self.session_counter}"
            self.chat_sessions[session_id] = {
                "messages": [],
                "created_at": datetime.now(),
                "last_activity": datetime.now()
            }
        else:
            self.chat_sessions[session_id]["last_activity"] = datetime.now()
        
        return session_id
    
    def get_ai_response(self, user_message: str, conversation_history: List[Dict[str, Any]] = None) -> str:
        """Get AI response using OpenAI API"""
        try:
            if not openai.api_key:
                raise HTTPException(status_code=500, detail="OpenAI API key not configured")
            
            # Prepare conversation context
            conversation_context = ""
            if conversation_history:
                conversation_context = "\n".join([
                    f"{'User' if msg.get('role') == 'user' else 'Assistant'}: {msg.get('content', '')}"
                    for msg in conversation_history[-5:]  # Last 5 messages for context
                ])
            
            # Create system prompt
            system_prompt = f"""You are an AI Task Assistant that helps users with task management, scheduling, organization, and homework completion. 
            
            Be helpful, conversational, and maintain context from previous messages in the conversation. Be focused on getting things done.
            
            Previous conversation context:
            {conversation_context}
            
            Current user request: {user_message}
            
            Provide a helpful response and suggest 2-3 specific actions the user can take."""
            
            # Get AI response using new OpenAI API
            client = openai.OpenAI(api_key=openai.api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            logger.error(f"Error getting AI response: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error getting AI response: {str(e)}")
    
    def update_session(self, session_id: str, user_message: str, ai_response: str):
        """Update chat session with new messages"""
        if session_id in self.chat_sessions:
            self.chat_sessions[session_id]["messages"].append({
                "role": "user",
                "content": user_message,
                "timestamp": datetime.now().isoformat()
            })
            self.chat_sessions[session_id]["messages"].append({
                "role": "assistant",
                "content": ai_response,
                "timestamp": datetime.now().isoformat()
            })
    
    def get_task_suggestions(self) -> List[str]:
        """Get default task suggestions"""
        return [
            "Break down the task into smaller steps",
            "Set specific deadlines for each step",
            "Create a checklist to track progress"
        ]
    
    def get_session_messages(self, session_id: str) -> List[Dict[str, Any]]:
        """Get messages for a specific session"""
        return self.chat_sessions.get(session_id, {}).get("messages", [])
