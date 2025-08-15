# AI Task Assistant - Frontend

A modern React frontend for the AI Task Assistant that provides intelligent task management, scheduling, and homework assistance through an interactive chat interface.

## Features

- 🎨 Modern Material-UI design with beautiful gradients
- 💬 Interactive chat interface with AI-powered responses
- 📝 Form mode for structured task assistance requests
- 🔄 Real-time chat sessions with conversation history
- 🤖 AI-powered task suggestions and recommendations
- 📱 Responsive design for all devices
- ⚡ Smooth animations and typing indicators
- 🆕 Session management with new chat functionality

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Backend server running on `http://localhost:8000`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## API Integration

The frontend communicates with the following backend endpoints:

- `POST /chat/new-session` - Creates a new chat session
- `POST /task/assistant` - Gets AI-powered task assistance
- `GET /chat/session/{session_id}` - Retrieves chat session details
- `DELETE /chat/session/{session_id}` - Deletes a chat session
- `GET /health` - Health check endpoint

## Project Structure

```
src/
├── App.js                    # Main application component
├── index.js                  # Application entry point
├── index.css                 # Global styles and custom CSS
└── components/               # Reusable components
    ├── TaskAssistant.js      # Main AI Task Assistant component
    └── EmotionalTaskAnalysis.js # Emotional task analysis component
```

## Components

### TaskAssistant.js
The main component that provides:
- **Chat Mode**: Interactive conversation with AI assistant
- **Form Mode**: Structured input for task assistance
- **Session Management**: Persistent chat sessions
- **Real-time Responses**: AI-powered task suggestions

### EmotionalTaskAnalysis.js
Component for emotional intelligence-based task analysis and recommendations.

## Dependencies

- **React** - UI library
- **Material-UI** - Component library and icons
- **Axios** - HTTP client for API calls
- **Emotion** - CSS-in-JS styling solution

## Usage

### Chat Mode
1. Type your task or question in the chat input
2. Receive AI-powered responses and suggestions
3. Continue the conversation for detailed assistance
4. Start new chat sessions as needed

### Form Mode
1. Switch to form mode using the toggle button
2. Enter detailed task description
3. Submit for comprehensive AI assistance
4. View structured response with action items

## Customization

### Changing API Base URL

Update the `API_BASE_URL` constant in your components:

```javascript
const API_BASE_URL = 'http://your-backend-url:port';
```

### Styling

The app uses Material-UI's theming system. You can customize colors, typography, and spacing by modifying the theme configuration.

### Adding New Features

1. Create new components in the `src/components/` directory
2. Import and use them in `App.js`
3. Add corresponding API calls using axios

## Troubleshooting

### Common Issues

1. **Backend Connection Error**: Ensure the backend server is running on the correct port
2. **CORS Issues**: The backend should have CORS enabled for the frontend domain
3. **Port Conflicts**: If port 3000 is busy, React will automatically suggest an alternative port
4. **API Key Issues**: Ensure your OpenAI API key is configured in the backend

### Development Tips

- Use the browser's developer tools to inspect API calls
- Check the console for any JavaScript errors
- Verify that all required environment variables are set in the backend
- Test both chat and form modes for comprehensive functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the AI Task Assistant system.
