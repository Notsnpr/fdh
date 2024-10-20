import React from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import ResumeAnimation from './ResumeAnimation';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(8, 0, 6),
}));

const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'center',
}));

const Slogan = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '2rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1, 4),
  fontSize: '1.2rem',
}));

export default function Home() {
  return (
    <HeroSection>
      <HeroContent>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to JobSync
        </Typography>
        <Slogan variant="h4" component="h2">
          Your Resume. Matched to Perfection.
        </Slogan>
        <Typography variant="h5" component="h3" paragraph>
          Your intelligent resume analyzer and job matching assistant.
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <ResumeAnimation />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              JobSync uses cutting-edge AI to analyze your resume and match you with the perfect job opportunities. 
              Get started now and take the next step in your career!
            </Typography>
            <CTAButton
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/resume-analyzer"
            >
              Analyze Your Resume Now
            </CTAButton>
          </Grid>
        </Grid>
      </HeroContent>
    </HeroSection>
  );
}