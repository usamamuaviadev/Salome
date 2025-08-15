# AI Task Assistant - Backend

A clean, organized FastAPI backend for the AI Task Assistant application.

## Project Structure

```
backend/
├── api/                    # API route definitions
│   ├── __init__.py
│   ├── chat_routes.py     # Chat session management endpoints
│   ├── task_routes.py     # Task assistance endpoints
│   └── health_routes.py   # Health monitoring endpoints
├── models/                 # Pydantic data models
│   ├── __init__.py
│   ├── request_models.py  # Request data models
│   └── response_models.py # Response data models
├── services/               # Business logic services
│   ├── __init__.py
│   └── chat_service.py    # Chat and AI interaction logic
├── utils/                  # Utility functions
│   ├── __init__.py
│   └── config.py          # Configuration management
├── main.py                 # Main application entry point
├── requirements.txt        # Python dependencies
├── config.env.example      # Environment variables template
└── README.md              # This file
```

## Features

- **Organized Code Structure**: Clean separation of concerns with dedicated directories for different components
- **Modular API Design**: Separate route files for different API functionalities
- **Service Layer**: Business logic separated from API endpoints
- **Configuration Management**: Centralized configuration handling
- **Health Monitoring**: Built-in health check endpoints
- **Chat Session Management**: Persistent chat sessions with conversation history
- **AI Task Assistance**: OpenAI-powered task management and homework help

## API Endpoints

### Chat Management
- `POST /chat/new-session` - Create a new chat session
- `GET /chat/session/{session_id}` - Get chat session details
- `DELETE /chat/session/{session_id}` - Delete a chat session

### Task Assistance
- `POST /task/assistant` - Get AI-powered task assistance

### Health Monitoring
- `GET /health` - System health check

## Setup and Installation

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Configuration**:
   ```bash
   cp config.env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Run the Application**:
   ```bash
   python main.py
   ```

   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Access the API**:
   - API Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

## Environment Variables

- `OPENAI_API_KEY` (Required): Your OpenAI API key for AI functionality
- `HOST` (Optional): Server host (default: 0.0.0.0)
- `PORT` (Optional): Server port (default: 8000)

## Development

The codebase is organized to make it easy to:
- Add new API endpoints by creating new route files
- Implement new services by adding to the services directory
- Define new data models in the models directory
- Add utility functions in the utils directory

## Dependencies

- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI applications
- **OpenAI**: Python client for OpenAI API
- **Pydantic**: Data validation using Python type annotations 