
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController'); // Adjusted path

// Route to get all complaints or filter by status
router.get('/', complaintController.getComplaints);

// Route to add a new complaint
router.post('/', complaintController.addComplaint);

// Route to update the status of a complaint by ID
router.put('/:id/status', complaintController.updateComplaintStatus);

// Route to get a single complaint by ID
router.get('/:id', complaintController.getComplaintById);

// Route to update a complaint by ID
router.put('/:id', complaintController.updateComplaint);

// Route to delete a complaint by ID
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;


