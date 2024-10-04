import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ViewApos = () => {
    const [apos, setApos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [currentApo, setCurrentApo] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const departments = ['शालेय सुविधा', 'पाणी', 'रूम', 'वाहतूक '];

    useEffect(() => {
        const fetchApos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/apo');
                setApos(response.data);
            } catch (err) {
                setError('Error fetching APOs.');
            } finally {
                setLoading(false);
            }
        };

        fetchApos();
    }, []);

    useEffect(() => {
        // Enable the update button only if all fields are filled
        setIsButtonDisabled(!(username && password && department));
    }, [username, password, department]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/apo/${id}`);
            if (response.status === 200) {
                setApos(apos.filter(apo => apo._id !== id));
            } else {
                setError('Error deleting APO.');
            }
        } catch (err) {
            setError('Error deleting APO.');
        }
    };

    const handleClickOpen = (apo) => {
        setCurrentApo(apo);
        setUsername(apo.username);
        setPassword(apo.password); // Set password field
        setDepartment(apo.department);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/apo/${currentApo._id}`, {
                username,
                password,
                department
            });
            setApos(apos.map(apo => apo._id === response.data._id ? response.data : apo));
            handleClose();
            setSnackbarOpen(true); // Show snackbar on success
        } catch (err) {
            setError('Error updating APO.');
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <TableContainer component={Paper}>
                <Typography variant="h4" gutterBottom sx={{ p: 2 }}>View APOs</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apos.map(apo => (
                            <TableRow key={apo._id}>
                                <TableCell>{apo.username}</TableCell>
                                <TableCell>{apo.department}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleClickOpen(apo)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(apo._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update APO</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="text"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Select
                        margin="dense"
                        label="Department"
                        fullWidth
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>
                                {dept}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button
                        onClick={handleUpdate}
                        color="primary"
                        disabled={isButtonDisabled} // Disable button if fields are not filled
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for update success */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    User has been updated successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ViewApos;
