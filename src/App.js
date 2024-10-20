import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, ThemeProvider, createTheme, CssBaseline, IconButton, Box, Menu, MenuItem } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import ResumeAnalyzer from './Components/ResumeAnalyzer';
import ResumeAnalysisPage from './Components/ResumeAnalysisPage';
import JobMatcher from './Components/JobMatcher';
import Home from './Components/Home';
import LoginDialog from './Components/LoginDialog';
import CreateAccountDialog from './Components/CreateAccountDialog';
import ForgotPasswordDialog from './Components/ForgotPasswordDialog';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7db3e8',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openCreateAccountDialog, setOpenCreateAccountDialog] = useState(false);
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    setOpenLoginDialog(true);
  };

  const handleCreateAccount = () => {
    handleClose();
    setOpenCreateAccountDialog(true);
  };

  const handleForgotPassword = () => {
    handleClose();
    setOpenForgotPasswordDialog(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleClose();
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setOpenLoginDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <AppBar position="static">
            <Toolbar>
              <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <img src="https://fdh-logo.s3.us-east-2.amazonaws.com/JobSyncCorner.png" alt="JobSync Logo" style={{ height: '40px', marginRight: '10px' }} />
              </Box>
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Button color="inherit" component={Link} to="/resume-analyzer">RESUME ANALYZER</Button>
                <Button color="inherit" component={Link} to="/job-matcher">JOB MATCHER</Button>
              </div>
              <IconButton color="inherit" edge="end" onClick={handleMenu}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {isLoggedIn ? (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                  [
                    <MenuItem key="login" onClick={handleLogin}>Login</MenuItem>,
                    <MenuItem key="create" onClick={handleCreateAccount}>Create Account</MenuItem>,
                    <MenuItem key="forgot" onClick={handleForgotPassword}>Forgot Password</MenuItem>
                  ]
                )}
              </Menu>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
              <Route path="/job-matcher" element={<JobMatcher />} />
            </Routes>
          </Container>

          <LoginDialog open={openLoginDialog} onClose={() => setOpenLoginDialog(false)} onLogin={handleLoginSuccess} />
          <CreateAccountDialog open={openCreateAccountDialog} onClose={() => setOpenCreateAccountDialog(false)} />
          <ForgotPasswordDialog open={openForgotPasswordDialog} onClose={() => setOpenForgotPasswordDialog(false)} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;