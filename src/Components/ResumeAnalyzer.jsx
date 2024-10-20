import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, CircularProgress, Grid, Paper, TextField, Snackbar, Alert } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Send as SendIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ResumeAnalyzer.css';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recruiterRequirements, setRecruiterRequirements] = useState('');
  const [apiConfigured, setApiConfigured] = useState(true);
  const API_KEY = "AIzaSyDD5M_mPhsO3yPHWsDqUSOiGOxyz7Mish4"; // Note: Exposing API keys in client-side code is not recommended for production
  const navigate = useNavigate();

  const genAIRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    try {
      genAIRef.current = new GoogleGenerativeAI(API_KEY);
      modelRef.current = genAIRef.current.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (error) {
      console.error('Error initializing Google Generative AI:', error);
      setApiConfigured(false);
      setError('Failed to initialize AI service. Please try again later.');
    }
  }, []);

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
    if (!file || !recruiterRequirements.trim()) {
      setError('Please upload a resume and enter recruiter requirements.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result.split(',')[1];
        const prompt = `Analyze this resume image and compare it to the following recruiter requirements: ${recruiterRequirements}. Provide a detailed assessment of the candidate's suitability for the position.`;

        const result = await modelRef.current.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: file.type,
              data: base64Image
            }
          }
        ]);

        const response = await result.response;
        const analysis = response.text();

        navigate('/resume-analysis', { 
          state: { 
            analysis: analysis,
            resumeContent: filePreview,
            recruiterRequirements: recruiterRequirements
          } 
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError('Failed to analyze the resume. Please try again.');
      setApiConfigured(false);
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
    <Grid container spacing={3} className="resume-analyzer">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Resume Analyzer
        </Typography>
        <Typography variant="body1" paragraph>
          Upload a resume (PNG or JPEG) and enter recruiter requirements for analysis.
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
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Enter recruiter requirements..."
              value={recruiterRequirements}
              onChange={(e) => setRecruiterRequirements(e.target.value)}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!file || loading || !apiConfigured || !recruiterRequirements.trim()}
              className="submit-button"
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        {filePreview && (
          <Paper elevation={3} className="preview-section">
            <Typography variant="h6" gutterBottom>
              Resume Preview
            </Typography>
            <img src={filePreview} alt="Resume preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </Paper>
        )}
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
}