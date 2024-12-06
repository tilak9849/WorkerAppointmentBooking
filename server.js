const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure this is correct

// dotenv configuration
dotenv.config();

// MongoDB connection
connectDB();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Logger for development

// Routes
app.use('/api/v1/user', require('./routes/userRoute')); // Corrected the path
app.use('/api/v1/admin', require('./routes/adminRoutes')); // Corrected the path

// Port setup
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
