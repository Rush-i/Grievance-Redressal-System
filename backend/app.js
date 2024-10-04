const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const complaintRoutes = require('./routes/complaintRoutes');
const apoRoutes = require('./routes/apoRoutes');
// const grievanceRoutes = require('./routes/grievanceRoutes');


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use('/complaints', complaintRoutes);
app.use('/add-apo', apoRoutes);
// app.use('/apos', grievanceRoutes);

module.exports = app;
