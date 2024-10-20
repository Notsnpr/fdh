import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import './LoginDialog.css';

export default function LoginDialog({ open, onClose, onLoginSuccess, onCreateAccount, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password, rememberMe });
    onLoginSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="login-dialog">
      <DialogContent>
        <form className="form-container" onSubmit={handleLogin}>
          <h1 className="form-title primary">Log In</h1>
          <div className="input-container">
            <label htmlFor="email">Email*</label>
            <TextField
              required
              type="email"
              id="email"
              placeholder="example@xyz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password*</label>
            <TextField
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className="forget-password flex-row">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  name="remember-me"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link href="#" className="text-medium primary" onClick={onForgotPassword}>
              Forgot your password?
            </Link>
          </div>
          <Button type="submit" className="btn btn-primary" fullWidth>
            Log In
          </Button>
          <Typography className="text-medium" align="center" style={{ marginTop: '1rem' }}>
            Don't have an account? <Link href="#" onClick={onCreateAccount}>Create an account</Link>
          </Typography>
        </form>
      </DialogContent>
    </Dialog>
  );
}