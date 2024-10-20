import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to JobSync
        </Typography>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Your Resume. Matched to Perfection.
        </Typography>
        <Typography variant="body1" paragraph>
          Your intelligent resume analyzer and job matching assistant.
        </Typography>
        <Typography variant="body1" paragraph>
          JobSync uses cutting-edge AI to analyze your resume and match you with the perfect job opportunities. Get started now and take the next step in your career!
        </Typography>
        <Button
          component={Link}
          to="/resume-analyzer"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          ANALYZE YOUR RESUME NOW
        </Button>
      </Box>
    </Container>
  );
}