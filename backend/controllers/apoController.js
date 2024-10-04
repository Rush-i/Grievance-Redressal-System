
// // Add other methods as needed (e.g., updateApo, deleteApo)

const Apo = require('../models/apo');

// Get all APOs
const getAllApos = async (req, res) => {
    try {
        const apos = await Apo.find();
        res.json(apos);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Create a new APO without hashing the password
const createApo = async (req, res) => {
    const { username, password, department } = req.body;
    try {
        console.log('Creating APO with username:', username);

        const existingApo = await Apo.findOne({ username });
        if (existingApo) {
            console.log('Username already exists:', username);
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newApo = new Apo({ username, password, department });
        await newApo.save();
        res.status(201).json({ message: 'APO added successfully' });
    } catch (err) {
        console.error('Error creating APO:', err.message);
        if (err.code === 11000) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

const getApoByUsername = async (req, res) => {
    try {
        const apo = await ApoModel.findOne({ username: req.params.username });
        if (apo) {
            res.json({ department: apo.department });
        } else {
            res.status(404).json({ message: 'APO not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const loginApo = async (req, res) => {
    const { username, password } = req.body;
    try {
        const apo = await Apo.findOne({ username });
        if (!apo || apo.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Ensure department is included in the response
        res.json({
            message: 'Login successful',
            department: apo.department
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// Update an APO
const updateApo = async (req, res) => {
    const { id } = req.params;
    const { username, password, department } = req.body;

    try {
        const updateFields = { username, password, department };

        const updatedApo = await Apo.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedApo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Add a new APO with username, password, and department
const addApo = async (req, res) => {
    const { username, password, department } = req.body;
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newApo = new Apo({ username, password: hashedPassword, department });
        await newApo.save();
        res.status(201).json(newApo);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate username
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = {
    getAllApos,
    createApo,
    loginApo,
    updateApo,
    addApo,
    getApoByUsername,
};
