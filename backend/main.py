"""
AI Task Assistant - Main Application
FastAPI application with organized structure
"""

import uvicorn
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.chat_routes import router as chat_router
from api.task_routes import router as task_router
from api.health_routes import router as health_router
from utils.config import Config

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="AI Task Assistant",
    description="AI-powered task management, organization, and homework assistance assistant",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router)
app.include_router(task_router)
app.include_router(health_router)

@app.on_event("startup")
async def startup_event():
    """Application startup event"""
    logger.info("Starting AI Task Assistant...")
    
    # Validate configuration
    if not Config.validate():
        logger.error("Configuration validation failed. Please check your environment variables.")
        logger.error("Required: OPENAI_API_KEY")
    else:
        logger.info("Configuration validated successfully")

@app.on_event("shutdown")
async def shutdown_event():
    """Application shutdown event"""
    logger.info("Shutting down AI Task Assistant...")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=Config.HOST,
        port=Config.PORT,
        reload=True
    )
