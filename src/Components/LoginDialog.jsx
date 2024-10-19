import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import './LoginDialog.css';

export default function LoginDialog({ open, handleClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in with: ${username}`);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="login-dialog">
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Email/Username"
          type="text"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="cancel-btn">Cancel</Button>
        <Button onClick={handleLogin} className="login-btn">Login</Button>
      </DialogActions>
    </Dialog>
  );
}
