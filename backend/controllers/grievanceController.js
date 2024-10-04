const Complaint = require('../models/complaint');
const Apo = require('../models/apo');

// Get grievances for a specific APO
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
    getComplaintsByDepartment,
    // other controllers...
};
