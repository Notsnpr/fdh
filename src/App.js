import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import ResumeAnalyzer from './Components/ResumeAnalyzer';
import JobMatcher from './Components/JobMatcher';
import LoginDialog from './Components/LoginDialog';
import './App.css';

const Home = () => (
  <>
    <Typography variant="h4" component="h1" gutterBottom>
      Welcome to JobSync
    </Typography>
    <Typography variant="body1">
      Your intelligent resume analyzer and job matching assistant.
    </Typography>
  </>
);

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <AppBar position="static" className="app-bar">
          <Toolbar>
            <Link to="/" className="logo-link">
              <img src="https://fdh-logo.s3.us-east-2.amazonaws.com/JobSyncCorner.png" alt="JobSync Logo" className="logo" />
            </Link>
            <Typography variant="h6" component="div" className="app-title"></Typography>
            <nav className="nav-links">
              <Button color="inherit" component={Link} to="/resume-analyzer">Resume Analyzer</Button>
              <Button color="inherit" component={Link} to="/job-matcher">Job Matcher</Button>
            </nav>
            {/* Login Icon Button */}
            <IconButton color="inherit" onClick={handleLoginOpen}>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LoginDialog open={loginOpen} onClose={handleLoginClose} />
        <Container maxWidth="lg" className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/job-matcher" element={<JobMatcher />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}
