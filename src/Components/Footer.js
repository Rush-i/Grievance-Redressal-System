import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ mt: 4, p: 3, bgcolor: '#333', color: '#fff', textAlign: 'center' }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        &copy; {new Date().getFullYear()} Grievance Redressal System. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <Link href="#" color="inherit" underline="none">
          Privacy Policy
        </Link> |
        <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
          Terms of Service
        </Link> |
        <Link href="#" color="inherit" underline="none">
          Contact Us
        </Link>
      </Typography>
      <Box sx={{ mt: 2 }}>
        <IconButton href="https://www.facebook.com" color="inherit">
          <Facebook />
        </IconButton>
        <IconButton href="https://www.twitter.com" color="inherit">
          <Twitter />
        </IconButton>
        <IconButton href="https://www.instagram.com" color="inherit">
          <Instagram />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
