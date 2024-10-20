import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField, Typography, Link } from '@mui/material';
import './CreateAccountDialog.css';

export default function CreateAccountDialog({ open, onClose, onCreateSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Creating account with:', { email, password });
    onCreateSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="create-account-dialog">
      <DialogContent>
        <form className="form-container" onSubmit={handleCreateAccount}>
          <h1 className="form-title primary">Create an Account</h1>
          <div className="input-container">
            <label htmlFor="create-email">Email*</label>
            <TextField
              required
              type="email"
              id="create-email"
              placeholder="example@xyz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <div className="input-container">
            <label htmlFor="create-password">Password*</label>
            <TextField
              required
              type="password"
              id="create-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirm-password">Confirm Password*</label>
            <TextField
              required
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </div>
          <Button type="submit" className="btn btn-primary" fullWidth>
            Create Account
          </Button>
          <Typography className="text-medium" align="center" style={{ marginTop: '1rem' }}>
            Already have an account? <Link href="#" onClick={onClose}>Log in</Link>
          </Typography>
        </form>
      </DialogContent>
    </Dialog>
  );
}