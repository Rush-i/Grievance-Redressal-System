
const Complaint = require('../models/complaint');

// Get all complaints or filter by status
const getComplaints = async (req, res) => {
    try {
        const { status } = req.query;
        const complaints = await Complaint.find(status ? { status } : {});
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new complaint
const addComplaint = async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body);
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update the status of a complaint by ID
const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedComplaint) return res.status(404).json({ error: 'Complaint not found' });
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await Complaint.findById(id);
        if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a complaint by ID
const updateComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComplaint = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedComplaint) return res.status(404).json({ error: 'Complaint not found' });
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a complaint by ID
const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComplaint = await Complaint.findByIdAndDelete(id);
        if (!deletedComplaint) return res.status(404).json({ error: 'Complaint not found' });
        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getComplaintsByDepartment = async (req, res) => {
    try {
        const { username } = req.params;

        // Find APO by username to get their department
        const apo = await Apo.findOne({ username });
        if (!apo) {
            return res.status(404).json({ message: 'APO not found' });
        }

        // Fetch complaints filtered by APO's department
        const complaints = await Complaint.find({ grievanceType: apo.department });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    getComplaints,
    addComplaint,
    updateComplaintStatus,
    getComplaintById,
    updateComplaint,
    deleteComplaint,
    getComplaintsByDepartment,
};
