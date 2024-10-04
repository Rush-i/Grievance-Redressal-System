
const express = require('express');
const router = express.Router();
const { getAllApos, createApo, loginApo, addApo, updateApo } = require('../controllers/apoController');
const Apo = require('../models/apo');


// Define routes
router.get('/', getAllApos);           // Get all APOs
router.post('/create', createApo);    // Create a new APO
router.post('/login', loginApo);      // Login an APO
router.post('/add', addApo);          // Add a new APO
router.put('/:id', updateApo); // Update APO

router.get('/view', async (req, res) => {
    try {
        const apos = await Apo.find();
        res.status(200).json(apos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching APOs', error: err.message });
    }
});


// DELETE route for deleting APO
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Apo.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'APO not found' });
        }

        res.status(200).json({ message: 'APO deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting APO', error: err.message });
    }
});

module.exports = router;