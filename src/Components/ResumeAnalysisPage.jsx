import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import './ResumeAnalysisPage.css';

export default function ResumeAnalysisPage() {
  const [resumeContent, setResumeContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulating fetching the resume content
    // In a real application, you would fetch this from your backend
    setResumeContent('This is a sample resume content. Replace this with the actual resume.');
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulating API call to Gemini
      // In a real application, you would make an actual API call here
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ text: `Response to: ${input}` }), 1000)
      );

      const aiMessage = { text: response.text, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" className="resume-analysis-page">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="resume-paper">
            <Typography variant="h6" gutterBottom>Your Resume</Typography>
            <Typography variant="body1">{resumeContent}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="chat-paper">
            <Typography variant="h6" gutterBottom>Chat with AI</Typography>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <Typography variant="body1">{message.text}</Typography>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ask a question about your resume..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                onClick={handleSendMessage}
                disabled={loading}
              >
                Send
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}