import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import './LoginDialog.css'

export default function LoginDialog({ open, onClose, onLoginSuccess }) { //Added onLoginSuccess 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
    onLoginSuccess(); //Notify that the user has logged in
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={onClose} className="login-dialog">
      <DialogTitle>Login to Your Account</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Please enter your email and password to login.
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
