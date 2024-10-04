
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Grid } from '@mui/material';
import axios from 'axios';

const ComplaintForm = ({ onClose, onSuccess = () => { } }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    hostel: '',
    grievanceType: '',
    description: '',
    mobileNumber: '',
    status: 'Ongoing',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    tempErrors.name = formData.name
      ? (nameRegex.test(formData.name) ? '' : 'Name should only contain letters.')
      : 'Name is required.';

    tempErrors.class = formData.class ? '' : 'Class is required.';
    tempErrors.hostel = formData.hostel ? '' : 'Hostel selection is required.';
    tempErrors.grievanceType = formData.grievanceType ? '' : 'Grievance type is required.';
    tempErrors.description = formData.description ? '' : 'Description is required.';
    tempErrors.mobileNumber = formData.mobileNumber
      ? formData.mobileNumber.match(/^[0-9]{10}$/)
        ? ''
        : 'Enter a valid 10-digit mobile number.'
      : 'Mobile number is required.';

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3000/api/complaints', formData);
        onSuccess(); // Call onSuccess if it’s a function
        onClose();   // Close the form
      } catch (error) {
        setErrors({ ...errors, submit: error.response?.data?.message || 'Failed to submit complaint. Please try again later.' });
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h5" gutterBottom>
        Raise a Complaint
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.class}
            helperText={errors.class}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hostel"
            name="hostel"
            select
            value={formData.hostel}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.hostel}
            helperText={errors.hostel}
          >
            {[
              'शासकीय आश्रम शाळा, सारखणी',
              'शासकीय मुलींचे वसतिगृह, किनवट',
              'शासकीय मुलांचे वसतिगृह, नांदेड क्र.२',
              'शासकीय आश्रम शाळा, तुळशी',
              'शासकीय मुलांचे वसतिगृह, नांदेड क्र.१'
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Type of Grievance"
            name="grievanceType"
            select
            value={formData.grievanceType}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.grievanceType}
            helperText={errors.grievanceType}
          >
            {[
              'शालेय सुविधा',
              'पाणी',
              'रूम',
              'वाहतूक'
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={onClose} variant="outlined" color="secondary" fullWidth>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplaintForm;
