
const APO = require('../models/apo');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const apo = await APO.findOne({ username });
        if (!apo || apo.password !== password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Proceed with generating JWT or any further logic
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
