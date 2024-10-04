
// src/components/APOLoginForm.js

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const APOLoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    hostel: '',
    grievanceType: '',
    description: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle APO form submission
    console.log('APO Form Submitted', formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        APO Login Form
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Class"
        name="class"
        value={formData.class}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Hostel"
        name="hostel"
        value={formData.hostel}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Type of Grievance"
        name="grievanceType"
        value={formData.grievanceType}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        multiline
        rows={4}
      />
      <TextField
        label="Mobile Number"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
      <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default APOLoginForm;
