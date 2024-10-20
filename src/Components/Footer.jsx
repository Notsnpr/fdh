import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              About JobSync
            </Typography>
            <Typography variant="body2" color="textSecondary">
              JobSync is your intelligent resume analyzer and job matching assistant, helping you find the perfect career opportunities.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="textSecondary" display="block">Home</Link>
            <Link href="/resume-analyzer" color="textSecondary" display="block">Resume Analyzer</Link>
            <Link href="/job-matcher" color="textSecondary" display="block">Job Matcher</Link>
            <Link href="#" color="textSecondary" display="block">Privacy Policy</Link>
            <Link href="#" color="textSecondary" display="block">Terms of Service</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Connect With Us
            </Typography>
            <Link href="#" color="inherit" className="social-icon">
              <Facebook />
            </Link>
            <Link href="#" color="inherit" className="social-icon">
              <Twitter />
            </Link>
            <Link href="#" color="inherit" className="social-icon">
              <LinkedIn />
            </Link>
            <Link href="#" color="inherit" className="social-icon">
              <Instagram />
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '2rem' }}>
          © {new Date().getFullYear()} JobSync. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;