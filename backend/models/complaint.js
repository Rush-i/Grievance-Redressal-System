
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    hostel: { type: String, required: true },
    grievanceType: { type: String, required: true },
    description: { type: String, required: true },
    mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
    status: { type: String, required: true, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
    createdAt: { type: Date, default: Date.now } // Automatically stores the timestamp of form submission
});
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
