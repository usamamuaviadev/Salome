import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Assignment,
  Lightbulb,
  CheckCircle,
  Timer,
  Celebration
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

function TaskAssistant() {
  const [formData, setFormData] = useState({
    combinedInput: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [chatMode, setChatMode] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Initialize chat session
  const initializeChat = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/new-session`);
      setCurrentSessionId(response.data.session_id);
      console.log('New chat session created:', response.data.session_id);
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  };

  // Add message to chat
  const addMessageToChat = (role, content, timestamp = null) => {
    const message = {
      id: Date.now(),
      role,
      content,
      timestamp: timestamp || new Date().toLocaleTimeString()
    };
    setChatMessages(prev => [...prev, message]);
  };

  // Send chat message
  const sendChatMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    addMessageToChat('user', message);
    setNewMessage('');

    // Show typing indicator
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/task/assistant`, {
        user_message: message,
        session_id: currentSessionId,
        conversation_history: conversationHistory
      });

      // Hide typing indicator
      setIsTyping(false);

      if (response.data) {
        // Add AI response to chat
        addMessageToChat('assistant', response.data.ai_response);

        // Update conversation history
        setConversationHistory(response.data.conversation_history || []);
        setCurrentSessionId(response.data.session_id);

        // Add task suggestions if available
        if (response.data.task_suggestions && response.data.task_suggestions.length > 0) {
          const suggestionsText = response.data.task_suggestions.map(suggestion => 
            `• ${suggestion}`
          ).join('\n');
          addMessageToChat('assistant', `💡 Suggested Actions:\n${suggestionsText}`);
        }
      }
    } catch (error) {
      setIsTyping(false);
      addMessageToChat('assistant', `❌ Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  // Start new chat
  const startNewChat = async () => {
    setChatMessages([]);
    setConversationHistory([]);
    await initializeChat();
  };

  // Initialize chat when component mounts
  React.useEffect(() => {
    initializeChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Send the user's message directly to the task assistant

      const response = await axios.post(`${API_BASE_URL}/task/assistant`, {
        user_message: formData.combinedInput
      });
      setResult(response.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.detail || 'An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };



  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Assignment sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            AI Task Assistant
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Get help with task management, scheduling, organization, and homework completion
          </Typography>
        </Box>

        {/* Mode Toggle */}
        <Box textAlign="center" mb={3}>
          <Button
            variant={chatMode ? "contained" : "outlined"}
            onClick={() => setChatMode(true)}
            sx={{ mr: 2 }}
          >
            💬 Chat Mode
          </Button>
          <Button
            variant={!chatMode ? "contained" : "outlined"}
            onClick={() => setChatMode(false)}
          >
            📝 Form Mode
          </Button>
        </Box>

                {chatMode ? (
          // Chat Interface
          <Box>
            {/* Chat Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" color="primary">
                💬 Chat with AI Assistant
              </Typography>
              <Button
                variant="outlined"
                onClick={startNewChat}
                startIcon={<span>🆕</span>}
              >
                New Chat
              </Button>
            </Box>

            {/* Chat Messages */}
            <Box
              sx={{
                height: 400,
                overflowY: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2,
                mb: 2,
                backgroundColor: 'grey.50'
              }}
            >
              {chatMessages.length === 0 ? (
                <Box textAlign="center" color="text.secondary" py={4}>
                  <Typography variant="h6" gutterBottom>
                    👋 Hi! I'm your AI Task Assistant
                  </Typography>
                  <Typography variant="body2">
                    I can help you with homework completion, task management, scheduling, and more!
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Start by typing your request below.
                  </Typography>
                </Box>
              ) : (
                chatMessages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: message.role === 'user' ? 'primary.main' : 'grey.200',
                        color: message.role === 'user' ? 'white' : 'text.primary'
                      }}
                    >
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {message.content}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7, mt: 1, display: 'block' }}>
                        {message.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                <Box display="flex" justifyContent="flex-start" mb={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: 'grey.200'
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box display="flex" gap={0.5}>
                        <Box
                          component="span"
                          sx={{
                            width: 8,
                            height: 8,
                            backgroundColor: 'grey.500',
                            borderRadius: '50%',
                            animation: 'typing 1.4s infinite ease-in-out',
                            '&:nth-of-type(1)': { animationDelay: '-0.32s' },
                            '&:nth-of-type(2)': { animationDelay: '-0.16s' }
                          }}
                        />
                        <Box
                          component="span"
                          sx={{
                            width: 8,
                            height: 8,
                            backgroundColor: 'grey.500',
                            borderRadius: '50%',
                            animation: 'typing 1.4s infinite ease-in-out'
                          }}
                        />
                        <Box
                          component="span"
                          sx={{
                            width: 8,
                            height: 8,
                            backgroundColor: 'grey.500',
                            borderRadius: '50%',
                            animation: 'typing 1.4s infinite ease-in-out'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        AI is typing...
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Chat Input */}
            <Box component="form" onSubmit={(e) => { e.preventDefault(); sendChatMessage(newMessage); }}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here... (e.g., 'Can you write my essay about climate change?')"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!newMessage.trim() || isTyping}
                    sx={{ minWidth: 100 }}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          // Form Interface
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="What would you like help with?"
                  name="combinedInput"
                  value={formData.combinedInput}
                  onChange={handleInputChange}
                  multiline
                  rows={6}
                  placeholder="Examples:&#10;- Help me organize my day&#10;- Break down my history project&#10;- Schedule time with friends&#10;- Plan my study sessions&#10;- Write my essay about climate change&#10;- Solve this math problem: 3x + 7 = 22&#10;- Complete my science homework about photosynthesis"
                  required
                  variant="outlined"
                  helperText="Tell me what you need help with - task management, scheduling, organization, coordination, or homework completion."
                />
              </Grid>
            </Grid>

            <Box textAlign="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ px: 4, py: 1.5 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Get AI Assistance'
                )}
              </Button>
            </Box>
          </form>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Error:</strong> {error}
            </Typography>
            <Typography variant="body2">
              Please check that:
            </Typography>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>The backend server is running on http://localhost:8000</li>
              <li>Your OpenAI API key is configured in the backend</li>
              <li>You've provided a clear description of what you need help with</li>
            </ul>
          </Alert>
        )}

        {result && (
          <Box mt={4}>
            <Divider sx={{ mb: 3 }}>
              <Chip label="AI Assistant Response" color="primary" />
            </Divider>

            <Grid container spacing={3}>
              {/* AI Response */}
              <Grid item xs={12}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      <Lightbulb sx={{ mr: 1, verticalAlign: 'middle' }} />
                      AI Response
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                      {result.ai_response}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>



              {/* Task Suggestions */}
              <Grid item xs={12} md={6}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Suggested Actions
                    </Typography>
                    {result.task_suggestions && result.task_suggestions.length > 0 && (
                      <List>
                        {result.task_suggestions.map((suggestion, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon>
                              <Celebration color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={suggestion} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>






                          {/* Timestamp */}
              <Grid item xs={12}>
                <Card elevation={1}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      <Timer sx={{ mr: 1, verticalAlign: 'middle', fontSize: 16 }} />
                      Generated at: {new Date(result.timestamp).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default TaskAssistant;
