import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Grid, Paper, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import './JobMatcher.css';

export default function JobMatcher() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [jobRecommendations, setJobRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      // First, upload the resume
      const uploadResponse = await fetch('/api/upload-resume/', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`HTTP error! status: ${uploadResponse.status}`);
      }

      const uploadResult = await uploadResponse.json();

      // Then, get job recommendations based on the uploaded resume
      const recommendationsResponse = await fetch('/api/get-job-recommendations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeId: uploadResult.resumeId }),
      });

      if (!recommendationsResponse.ok) {
        throw new Error(`HTTP error! status: ${recommendationsResponse.status}`);
      }

      const recommendations = await recommendationsResponse.json();
      setJobRecommendations(recommendations);
    } catch (error) {
      console.error('Error in job matching process:', error);
      setError('Failed to process your resume and find job matches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  return (
    <Grid container spacing={3} className="job-matcher">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Job Matcher
        </Typography>
        <Typography variant="body1" paragraph>
          Upload your resume (PNG or JPEG) to get personalized job recommendations based on your skills and experience.
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
              {loading ? <CircularProgress size={24} /> : 'Get Job Recommendations'}
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
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} className="results-section">
          <Typography variant="h6" gutterBottom>
            Job Recommendations
          </Typography>
          {jobRecommendations ? (
            <List>
              {jobRecommendations.map((job, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={job.title}
                    secondary={job.description}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">
              Upload your resume to see job recommendations.
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