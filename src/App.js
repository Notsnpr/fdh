import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Menu, MenuItem } from '@mui/material';
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
  //Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Dropdown Menu state
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLoginSuccess = () => {
    //Set user as logged in after successful login
    setIsLoggedIn(true); 
    //Close the dialog
    setLoginOpen(false);
  };

  const handleMenuOpen = (event) => {
    //Open dropdown menu
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    //Close dropdown menu
    setAnchorEl(null);
  };

  const handleLogout = () => {
    //Log out the user
    setIsLoggedIn(false);
    //Close dropdown menu
    setAnchorEl(null);
  }

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
            {/* Color changes based on login status */}
            {isLoggedIn ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  style={{ color: 'green' }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl ={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                color="inherit"
                onClick={handleLoginOpen}
                style={{ color: 'inherit' }}
              >
                <AccountCircle />
            </IconButton>
          )}
          </Toolbar>
        </AppBar>

        <LoginDialog open={loginOpen} onClose={handleLoginClose} onLoginSuccess={handleLoginSuccess} />
        
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
