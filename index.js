require('dotenv').config();
const express = require('express');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Base route for health check
app.get('/', (req, res) => {
    res.send('School Management API is running.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
