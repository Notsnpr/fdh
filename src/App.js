import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ResumeAnalyzer from './Components/ResumeAnalyzer';
import ResumeAnalysisPage from './Components/ResumeAnalysisPage';
import Footer from './Components/Footer';
import HomePage from './Components/Home';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <AppBar position="static" className="app-bar">
            <Toolbar>
              <Link to="/" className="logo-link">
                <img src="https://fdh-logo.s3.us-east-2.amazonaws.com/JobSyncCorner.png" alt="JobSync Logo" className="logo" />
              </Link>
              <Typography variant="h6" component="div" className="app-title">
              </Typography>
              <nav className="nav-links">
                <Button color="inherit" component={Link} to="/resume-analyzer">Resume Analyzer</Button>
              </nav>
            </Toolbar>
          </AppBar>
          
          <Container maxWidth="lg" className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
            </Routes>
          </Container>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}