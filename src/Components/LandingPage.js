import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Modal, AppBar, Toolbar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; // Import your CSS file
import ComplaintForm from './ComplaintForm';
import Footer from './Footer';
import Slider from 'react-slick'; // Import react-slick

const mockUser = {
  username: 'rk',
  password: '123'
};

const dummyAPOUser = {
  username: 'rrk',
  password: '123',
};

const LandingPage = () => {
  const [openComplaintForm, setOpenComplaintForm] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openAPOLoginForm, setOpenAPOLoginForm] = useState(false);
  const [isAPOLogin, setIsAPOLogin] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [view, setView] = useState('home');

  const navigate = useNavigate();

  const handleOpenComplaintForm = () => setOpenComplaintForm(true);
  const handleCloseComplaintForm = () => setOpenComplaintForm(false);
  const handleOpenLoginForm = () => {
    setOpenLoginForm(true);
    setOpenAPOLoginForm(false); // Close APO login form if open
    setIsAPOLogin(false);
  };
  const handleCloseLoginForm = () => {
    setOpenLoginForm(false);
    setLoginUsername('');
    setLoginPassword('');
    setError('');
    setSuccess('');
  };

  const handleOpenAPOLoginForm = () => {
    setOpenLoginForm(false); // Close regular login form
    setOpenAPOLoginForm(true);
    setIsAPOLogin(true);
  };

  const handleCloseAPOLoginForm = () => {
    setOpenAPOLoginForm(false);
    setIsAPOLogin(false);
    setUsername('');
    setPassword('');
    setDepartment('');
    setError('');
    setSuccess('');
  };

  const handleSubmitComplaint = async (formData) => {
    try {
      await axios.post('http://localhost:3000/api/complaints', formData); // Update API endpoint as needed
      setSuccess('Complaint submitted successfully!');
      setError('');
      handleCloseComplaintForm();
      // Optionally, you can trigger a refresh of complaints here or handle state management
    } catch (err) {
      setError('Error submitting complaint. Please try again.');
      setSuccess('');
    }
  };

  const handleLogin = async () => {
    try {
      // For regular user login
      if (loginUsername === mockUser.username && loginPassword === mockUser.password) {
        localStorage.setItem('role', "PO"); // Store department in localStorage
        setSuccess('Login successful!');
        setError('');
        navigate('/dashboard'); // Navigate to user dashboard
        handleCloseLoginForm();
      } else {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: loginUsername,
          password: loginPassword,
        });

        if (response.data.success) {
          setSuccess('Login successful!');
          setError('');
          navigate('/dashboard'); // Navigate to the user dashboard
          handleCloseLoginForm();
        } else {
          setError('Invalid username or password.');
          setSuccess('');
        }
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
      setSuccess('');
    }
  };

  const handleAPOLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/apo/login', {
        username,
        password,
      });

      console.log('Full response:', response.data); // This should include department

      if (response.data.message === 'Login successful') {
        const department = response.data.department; // Extract department from response
        console.log('Department from response:', department); // Log department value

        localStorage.setItem('apoDepartment', department); // Store department in localStorage

        setSuccess('APO Login successful!');
        setError('');
        navigate('/apo-dashboard'); // Navigate to APO-specific dashboard
        handleCloseAPOLoginForm();
      } else {
        setError('Invalid username or password.');
        setSuccess('');
      }
    } catch (err) {
      setError('Error logging in as APO. Please try again.');
      setSuccess('');
    }
  };

  const renderContent = () => {
    if (view === 'home') {
      return (
        <Box className="landing-page" sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            Welcome to the Grievance Redressal System
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph align="center" sx={{ fontSize: { xs: '0.875rem', md: '1.125rem' } }}>
            We are committed to addressing your concerns and resolving grievances efficiently.
          </Typography>

          {/* Carousel for Grievance Types */}
          <Box sx={{ mt: 4, width: { xs: '100%', md: '80%' }, mx: 'auto' }}>
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
            >
              <Box sx={{ padding: 2 }}>
                <img
                  src="/image1.jpg"
                  alt="Grievance Type 1"
                  className="carousel-image"
                  style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                />
                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>Water Related</Typography>
              </Box>
              <Box sx={{ padding: 2 }}>
                <img
                  src="/image2.jpg"
                  alt="Grievance Type 2"
                  className="carousel-image"
                  style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                />
                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>Room Related</Typography>
              </Box>
              <Box sx={{ padding: 2 }}>
                <img
                  src="/image3.webp"
                  alt="Grievance Type 3"
                  className="carousel-image"
                  style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                />
                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>Transportation</Typography>
              </Box>
            </Slider>
          </Box>
        </Box>
      );
    } else if (view === 'about') {
      return (
        <Box className="landing-page" sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
            About the Grievance Redressal System
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph align="center" sx={{ fontSize: { xs: '0.875rem', md: '1.125rem' } }}>
            Our Grievance Redressal System is designed to provide students residing in hostels a platform to raise complaints and have them addressed promptly.
            The system ensures transparency and accountability, facilitating effective communication between students and administration.
            We strive to create a supportive environment where students can voice their concerns without hesitation.
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ background: '#333', boxShadow: 3 }} className="app-bar">
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: { xs: '1rem', md: '1.25rem' }, display: 'flex', alignItems: 'center' }}>
            Grievance Redressal System
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              href="#"
              color="inherit"
              sx={{
                fontSize: { xs: '0.75rem', md: '1rem' },
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: '#2196f3', // Blue color on hover
                  textDecoration: 'underline'
                }
              }}
              underline="none"
              onClick={() => setView('home')}
            >
              Home
            </Link>
            <Link
              href="#"
              color="inherit"
              sx={{
                fontSize: { xs: '0.75rem', md: '1rem' },
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: '#2196f3', // Blue color on hover
                  textDecoration: 'underline'
                }
              }}
              underline="none"
              onClick={() => setView('about')}
            >
              About Us
            </Link>
            <Button
              color="inherit"
              onClick={handleOpenComplaintForm}
              sx={{
                fontSize: { xs: '0.75rem', md: '1rem' },
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#2196f3', // Blue color on hover
                  color: '#fff'
                }
              }}
            >
              Raise a Complaint
            </Button>
            <Button
              color="inherit"
              onClick={handleOpenLoginForm}
              sx={{
                fontSize: { xs: '0.75rem', md: '1rem' },
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#2196f3', // Blue color on hover
                  color: '#fff'
                }
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>


      {renderContent()}

      {/* Complaint Form Modal */}
      <Modal open={openComplaintForm} onClose={handleCloseComplaintForm}>
        <Box className="modal-box" sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
          <ComplaintForm onClose={handleCloseComplaintForm} onSubmit={handleSubmitComplaint} />
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
        </Box>
      </Modal>

      {/* Login Form Modal */}
      <Modal open={openLoginForm} onClose={handleCloseLoginForm}>
        <Box className="modal-box" sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6">Login</Typography>
          <TextField
            label="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 2 } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2, borderRadius: 2, '&:hover': { backgroundColor: '#2196f3' } }}
          >
            Login
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link
              component="button"
              onClick={handleOpenAPOLoginForm}
              sx={{
                '&:hover': {
                  color: '#2196f3', // Blue color on hover
                }
              }}
            >
              Login as APO
            </Link>
          </Typography>
        </Box>
      </Modal>

      {/* APO Login Form Modal */}
      <Modal open={openAPOLoginForm} onClose={handleCloseAPOLoginForm}>
        <Box className="modal-box" sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6">APO Login</Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 2 } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAPOLogin}
            sx={{ mt: 2, borderRadius: 2, '&:hover': { backgroundColor: '#2196f3' } }}
          >
            Login
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link
              component="button"
              onClick={handleOpenLoginForm}
              sx={{
                '&:hover': {
                  color: '#2196f3', // Blue color on hover
                }
              }}
            >
              Login as PO
            </Link>
          </Typography>
        </Box>
      </Modal>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default LandingPage;
