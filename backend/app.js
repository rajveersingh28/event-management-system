const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Retained as per your package list configuration
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'your-production-url.com',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Gateway Check
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to EventHub API Gateway!' });
});

// Routing Mount Point
app.use('/api/auth', authRoutes);

// System Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

// Global Error Handler Middleware Stack
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

module.exports = app;