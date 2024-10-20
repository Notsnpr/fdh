import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField, Typography, Link } from '@mui/material';
import './CreateAccountDialog.css';

export default function CreateAccountDialog({ open, onClose, onCreateSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Creating account with:', { firstName, lastName, email, password });
    // Here you would typically make an API call to create the account
    onCreateSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="create-account-dialog">
      <DialogContent>
        <form className="form-container" onSubmit={handleCreateAccount}>
          <h1 className="form-title primary">Create Account</h1>
          <div className="input-container">
            <label htmlFor="firstName">First Name*</label>
            <TextField
              required
              type="text"
              id="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName">Last Name*</label>
            <TextField
              required
              type="text"
              id="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </div>
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
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <TextField
              required
              type="password"
              id="confirmPassword"
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