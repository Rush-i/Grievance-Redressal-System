
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const departments = ['शालेय सुविधा', 'पाणी', 'रूम', 'वाहतूक']; // Example departments

const AddAPO = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddAPO = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/apo/create', {
        username,
        password,
        department,
      });
      setSuccess('APO added successfully!');
      setError('');
      setUsername('');
      setPassword('');
      setDepartment('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error adding APO. Please try again.');
      }
      setSuccess('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Add APO</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Department</InputLabel>
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          label="Department"
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAddAPO}>
        Add APO
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
    </Box>
  );
};

export default AddAPO;
