import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import './JobMatcher.css';

export default function JobMatcher() {
  const [jobDescription, setJobDescription] = useState('');
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!jobDescription) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/match-jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error matching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-matcher">
      <Typography variant="h5" gutterBottom>
        Job Matcher
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description here..."
          className="job-description-input"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!jobDescription || loading}
          className="submit-button"
        >
          {loading ? <CircularProgress size={24} /> : 'Match Jobs'}
        </Button>
      </form>
      {matches && (
        <div className="match-results">
          <Typography variant="h6">Matching Results:</Typography>
          <pre>{JSON.stringify(matches, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}