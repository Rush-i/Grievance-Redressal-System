const express = require('express');
const router = express.Router();

// Load User model
// const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// More routes (PUT, DELETE) can be added similarly

module.exports = router;
