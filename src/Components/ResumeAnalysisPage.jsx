import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ResumeAnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis, resumeContent, recruiterRequirements } = location.state || {};

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (analysis) {
      const formattedAnalysis = formatAnalysis(analysis);
      setChatHistory([{ type: 'ai', message: formattedAnalysis }]);
    } else {
      setError(true);
      setChatHistory([{ type: 'ai', message: "I apologize, but I encountered an error while analyzing the resume. Could you please try uploading the resume again?" }]);
    }
  }, [analysis]);

  const formatAnalysis = (analysisText) => {
    if (!analysisText || typeof analysisText !== 'string') {
      return "I'm sorry, but I don't have enough information to provide an analysis of the candidate's resume.";
    }
    
    try {
      const sections = analysisText.split('**').filter(section => section.trim() !== '');
      const overallImpression = sections.find(section => section.toLowerCase().includes('overall impression'));
      const strengths = sections.find(section => section.toLowerCase().includes('strengths'));
      const skills = sections.find(section => section.toLowerCase().includes('technical skills'));

      let formattedResponse = "Based on the resume analysis, ";
      if (overallImpression) {
        formattedResponse += overallImpression.split(':')[1].trim() + " ";
      }
      if (strengths) {
        formattedResponse += "The candidate's key strengths include " + strengths.split(':')[1].split('*')[0].trim() + ". ";
      }
      if (skills) {
        formattedResponse += "Their technical skills encompass " + skills.split(':')[1].split('*')[0].trim() + ". ";
      }
      formattedResponse += "Overall, the candidate appears to have a strong background in software engineering with relevant experience and a diverse skill set. However, for a more comprehensive evaluation, it would be beneficial to compare their qualifications directly with the specific job requirements.";

      return formattedResponse;
    } catch (error) {
      console.error('Error formatting analysis:', error);
      setError(true);
      return "I apologize, but I encountered an error while analyzing the resume. Could you please try uploading the resume again?";
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    setLoading(true);
    setChatHistory(prev => [...prev, { type: 'user', message: chatInput }]);
    setChatInput('');

    // Simulating AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'ai', message: `Thank you for your question about the candidate. Based on the resume analysis, the candidate appears to be well-qualified for a software engineering position. They have demonstrated strong technical skills, relevant work experience, and quantifiable achievements in their previous roles. However, to provide a more specific answer to your question, I would need to compare the candidate's qualifications directly to the job requirements. Is there a particular aspect of their background you'd like me to focus on?` }]);
      setLoading(false);
    }, 1000);
  };

  const handleRetry = () => {
    navigate('/resume-analyzer');
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Resume Analysis Results
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px', height: '600px', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Resume
            </Typography>
            {resumeContent ? (
              <img src={resumeContent} alt="Resume" style={{ maxWidth: '100%' }} />
            ) : (
              <Typography>No resume content available.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '20px', height: '600px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Chat
            </Typography>
            <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
              {chatHistory.map((chat, index) => (
                <Typography key={index} style={{ marginBottom: '10px', color: chat.type === 'user' ? 'blue' : 'green' }}>
                  <strong>{chat.type === 'user' ? 'You: ' : 'AI: '}</strong>{chat.message}
                </Typography>
              ))}
            </div>
            {error && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<RefreshIcon />}
                onClick={handleRetry}
                style={{ marginBottom: '20px' }}
              >
                Retry Analysis
              </Button>
            )}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ask a question about the analysis..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                  onClick={handleSendMessage}
                  disabled={loading || !chatInput.trim()}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}