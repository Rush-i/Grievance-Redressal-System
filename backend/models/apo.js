
const mongoose = require('mongoose');

const apoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String },
});

const Apo = mongoose.model('Apo', apoSchema);

module.exports = Apo;
