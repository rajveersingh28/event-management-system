const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Import newly created booking routes

const app = express();

// Security and Parsers Middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'your-production-url.com',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Gateway Route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to EventHub API Gateway!' });
});

// -----------------------------------------------------------------
// Mount Application Route Sub-Modules
// -----------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes); // Mounted Booking Gateway Endpoints

// System Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

// Centralized Catch-All Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

module.exports = app;