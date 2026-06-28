const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// 1. Cross-Origin Resource Sharing Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'your-production-url.com',
    credentials: true
}));

// 2. Body Parsing Middlewares
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// 3. Cookie Parsing Middleware
app.use(cookieParser());

// 4. Base Welcoming Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Welcome to EventHub API Gateway!' 
    });
});

// 5. System Health Check Route (Essential for Render/Cloud tracking)
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'UP',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// 6. Centralized Error Handling Middleware (Catch-all)
app.use((err, req, res, next) => {
    console.error(`💥 Error Stack: ${err.stack}`);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Only display error details during development mode for security
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

module.exports = app;