import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import ResumeAnalyzer from './Components/ResumeAnalyzer';
import JobMatcher from './Components/JobMatcher';
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
  return (
    <Router>
      <div className="app">
        <AppBar position="static" className="app-bar">
          <Toolbar>
            <img src="/placeholder.svg?height=40&width=40" alt="JobSync Logo" className="logo" />
            <Typography variant="h6" component="div" className="app-title">
              JobSync
            </Typography>
            <nav className="nav-links">
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/resume-analyzer">Resume Analyzer</Button>
              <Button color="inherit" component={Link} to="/job-matcher">Job Matcher</Button>
            </nav>
          </Toolbar>
        </AppBar>
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