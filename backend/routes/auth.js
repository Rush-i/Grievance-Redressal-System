
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
    // Authentication logic here
    res.send('Login route');
});

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
    // Registration logic here
    res.send('Register route');
});

module.exports = router;
