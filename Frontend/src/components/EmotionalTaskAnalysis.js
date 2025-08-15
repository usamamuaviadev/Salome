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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            Get help with task management, scheduling, and organization
          </Typography>
        </Box>

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
                placeholder="Examples:&#10;- Help me organize my day&#10;- Break down my history project&#10;- Schedule time with friends&#10;- Plan my study sessions&#10;- Coordinate a group meeting"
                required
                variant="outlined"
                helperText="Tell me what you need help with - task management, scheduling, organization, or coordination."
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
