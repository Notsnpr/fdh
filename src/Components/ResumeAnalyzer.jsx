import React, { useState } from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';
import './ResumeAnalyzer.css';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:8000/api/analyze-resume/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-analyzer">
      <Typography variant="h5" gutterBottom>
        Resume Analyzer
      </Typography>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="file-input"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!file || loading}
          className="submit-button"
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
        </Button>
      </form>
      {analysis && (
        <div className="analysis-results">
          <Typography variant="h6">Analysis Results:</Typography>
          <pre>{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}