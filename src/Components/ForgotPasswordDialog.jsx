import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField, Typography, Link } from '@mui/material';
import './ForgotPasswordDialog.css';

export default function ForgotPasswordDialog({ open, onClose, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to initiate the password reset process
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  return (
    <Dialog open={open} onClose={onClose} className="forgot-password-dialog">
      <DialogContent>
        {!isSubmitted ? (
          <form className="form-container" onSubmit={handleSubmit}>
            <h1 className="form-title primary">Forgot Password</h1>
            <Typography variant="body2" gutterBottom>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>
            <div className="input-container">
              <label htmlFor="forgot-password-email">Email*</label>
              <TextField
                required
                type="email"
                id="forgot-password-email"
                placeholder="example@xyz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </div>
            <Button type="submit" className="btn btn-primary" fullWidth>
              Reset Password
            </Button>
            <Typography className="text-medium" align="center" style={{ marginTop: '1rem' }}>
              Remember your password? <Link href="#" onClick={onBackToLogin}>Back to Login</Link>
            </Typography>
          </form>
        ) : (
          <div className="form-container">
            <h1 className="form-title primary">Check Your Email</h1>
            <Typography variant="body1" gutterBottom>
              We've sent a password reset link to {email}. Please check your email and follow the instructions to reset your password.
            </Typography>
            <Button onClick={onClose} className="btn btn-primary" fullWidth style={{ marginTop: '1rem' }}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}