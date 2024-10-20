import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Menu, MenuItem, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import ResumeAnalyzer from './Components/ResumeAnalyzer';
import ResumeAnalysisPage from './Components/ResumeAnalysisPage';
import JobMatcher from './Components/JobMatcher';
import LoginDialog from './Components/LoginDialog';
import CreateAccountDialog from './Components/CreateAccountDialog';
import ForgotPasswordDialog from './Components/ForgotPasswordDialog';
import SettingsPage from './Components/SettingsPage';
import Footer from './Components/Footer';
import HomePage from './Components/Home';
import firebase from './firebase.config.js';
//import { db, auth } from './firebase.js';
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
  const [loginOpen, setLoginOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleLoginOpen = () => {
    setLoginOpen(true);
    setCreateAccountOpen(false);
    setForgotPasswordOpen(false);
  };
  const handleLoginClose = () => setLoginOpen(false);
  const handleCreateAccountOpen = () => {
    setCreateAccountOpen(true);
    setLoginOpen(false);
    setForgotPasswordOpen(false);
  };
  const handleCreateAccountClose = () => setCreateAccountOpen(false);
  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
    setLoginOpen(false);
    setCreateAccountOpen(false);
  };
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginOpen(false);
  };

  const handleCreateAccountSuccess = () => {
    setIsLoggedIn(true);
    setCreateAccountOpen(false);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMobileMenuOpen = (event) => setMobileMenuAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchorEl(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

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
              <nav className="nav-links desktop-nav">
                <Button color="inherit" component={Link} to="/resume-analyzer">Resume Analyzer</Button>
                <Button color="inherit" component={Link} to="/job-matcher">Job Matcher</Button>
              </nav>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                className="mobile-menu-button"
              >
                <MenuIcon />
              </IconButton>
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
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>Settings</MenuItem>
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

          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            className="mobile-menu"
          >
            <MenuItem component={Link} to="/resume-analyzer" onClick={handleMobileMenuClose}>Resume Analyzer</MenuItem>
            <MenuItem component={Link} to="/job-matcher" onClick={handleMobileMenuClose}>Job Matcher</MenuItem>
          </Menu>

          <LoginDialog 
            open={loginOpen} 
            onClose={handleLoginClose} 
            onLoginSuccess={handleLoginSuccess}
            onCreateAccount={handleCreateAccountOpen}
            onForgotPassword={handleForgotPasswordOpen}
          />

          <CreateAccountDialog
            open={createAccountOpen}
            onClose={handleCreateAccountClose}
            onCreateSuccess={handleCreateAccountSuccess}
          />

          <ForgotPasswordDialog
            open={forgotPasswordOpen}
            onClose={handleForgotPasswordClose}
            onBackToLogin={handleLoginOpen}
          />
          
          <Container maxWidth="lg" className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
              <Route path="/job-matcher" element={<JobMatcher />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Container>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}