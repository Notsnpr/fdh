import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { Save as SaveIcon, Lock as LockIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prevNotifications => ({
      ...prevNotifications,
      [name]: checked,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    console.log('Profile update:', formData);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match!',
        severity: 'error',
      });
      return;
    }
    // Here you would typically send the password change request to your backend
    console.log('Password change:', {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    setSnackbar({
      open: true,
      message: 'Password changed successfully!',
      severity: 'success',
    });
  };

  const handleNotificationSave = () => {
    // Here you would typically send the updated notification preferences to your backend
    console.log('Notification preferences:', notifications);
    setSnackbar({
      open: true,
      message: 'Notification preferences updated!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <form onSubmit={handleProfileUpdate}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <form onSubmit={handlePasswordChange}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<LockIcon />}
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                  name="emailNotifications"
                  color="primary"
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.pushNotifications}
                  onChange={handleNotificationChange}
                  name="pushNotifications"
                  color="primary"
                />
              }
              label="Push Notifications"
            />
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="primary"
              startIcon={<NotificationsIcon />}
              onClick={handleNotificationSave}
            >
              Save Notification Preferences
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}