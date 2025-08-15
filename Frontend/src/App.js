import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Assignment,
  Home
} from '@mui/icons-material';
import TaskAssistant from './components/TaskAssistant';

function App() {
  return (
    <Box>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <Home sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Task Assistant
          </Typography>
        </Toolbar>
      </AppBar>

      <TaskAssistant />
    </Box>
  );
}

export default App;
