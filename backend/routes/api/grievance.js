const express = require('express');
const router = express.Router();

// Load Grievance model
// const Grievance = require('../../models/Grievance');

// @route   GET api/grievances
// @desc    Get all grievances
// @access  Public
router.get('/', async (req, res) => {
    try {
        const grievances = await Grievance.find();
        res.json(grievances);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/grievances
// @desc    Create a new grievance
// @access  Public
router.post('/', async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const newGrievance = new Grievance({ title, description, status });
        await newGrievance.save();
        res.json(newGrievance);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// More routes (PUT, DELETE) can be added similarly

module.exports = router;
