import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Grid, Paper, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Assessment as AssessmentIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './ResumeAnalyzer.css';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setError('Please upload a PNG or JPEG file.');
        setFile(null);
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/analyze-resume/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError('Failed to analyze resume. Please try again later or contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetailedAnalysis = () => {
    navigate('/resume-analysis', { state: { analysis } });
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  // Temporary function to view mock ResumeAnalysis screen
  const handleViewMockAnalysis = () => {
    const mockAnalysis = {
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Data Analysis'],
      experienceLevel: 'Mid-level',
      suggestions: ['Improve leadership skills', 'Gain more experience in cloud technologies', 'Contribute to open-source projects'],
      detailedAnalysis: `
        Your resume shows a strong foundation in web development technologies, particularly in the JavaScript ecosystem.
        Your experience with React and Node.js is notable, and you've demonstrated the ability to build full-stack applications.
        The addition of Python and data analysis skills suggests versatility and an interest in working with data.

        To further enhance your profile:
        1. Consider taking on leadership roles in your current position or in community projects to develop management skills.
        2. Explore cloud platforms like AWS, Azure, or Google Cloud to broaden your technological expertise.
        3. Contributing to open-source projects can showcase your coding abilities and collaboration skills to potential employers.

        Overall, your profile is well-suited for mid-level developer positions, with potential to grow into more senior roles
        as you gain experience in leadership and emerging technologies.
      `,
    };
    navigate('/resume-analysis', { state: { analysis: mockAnalysis } });
  };

  return (
    <Grid container spacing={3} className="resume-analyzer">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Resume Analyzer
        </Typography>
        <Typography variant="body1" paragraph>
          Upload your resume (PNG or JPEG) to get a detailed analysis of your skills, experience, and potential areas for improvement.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} className="upload-section">
          <form onSubmit={handleSubmit}>
            <input
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Resume
              </Button>
            </label>
            {file && (
              <Typography variant="body2" className="file-name">
                Selected file: {file.name}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!file || loading}
              className="submit-button"
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
            </Button>
          </form>
          {filePreview && (
            <div className="resume-preview">
              <Typography variant="h6" gutterBottom>
                Resume Preview
              </Typography>
              <img src={filePreview} alt="Resume preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </div>
          )}
          {/* Temporary button for viewing mock ResumeAnalysis screen */}
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            startIcon={<VisibilityIcon />}
            onClick={handleViewMockAnalysis}
            style={{ marginTop: '16px' }}
          >
            View Mock Analysis Screen
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} className="results-section">
          <Typography variant="h6" gutterBottom>
            Analysis Results
          </Typography>
          {analysis ? (
            <List>
              <ListItem>
                <ListItemText
                  primary="Skills Identified"
                  secondary={analysis.skills.join(', ')}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Experience Level"
                  secondary={analysis.experienceLevel}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Suggested Improvements"
                  secondary={analysis.suggestions.join(', ')}
                />
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AssessmentIcon />}
                  onClick={handleViewDetailedAnalysis}
                  fullWidth
                >
                  View Detailed Analysis
                </Button>
              </ListItem>
            </List>
          ) : (
            <Typography variant="body1">
              Upload your resume to see the analysis results.
            </Typography>
          )}
        </Paper>
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
}