import React, { useState } from 'react';
import { Dialog, DialogContent, Button, Checkbox, FormControlLabel, Link } from '@mui/material';
import './LoginDialog.css';

export default function LoginDialog({ open, onClose, onLoginSuccess }) {
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
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@xyz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password*</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Link href="#" className="text-medium primary">
              Forget your password?
            </Link>
          </div>
          <Button type="submit" className="btn btn-primary" fullWidth>
            Log In
          </Button>
          <p className="text-medium">
            Don't have an account?{' '}
            <Link href="#" className="text-medium primary">
              Create an account
            </Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}