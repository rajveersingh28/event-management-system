const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect Middleware: Verifies JWT from the Authorization Header
 */
const protect = async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token string from header split: "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify the token cryptographic signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user context from DB without the password field
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                return next(new Error('Not authorized, user not found'));
            }

            next(); // Pass control to the next controller function
        } catch (error) {
            console.error(`💥 Auth validation error: ${error.message}`);
            res.status(401);
            return next(new Error('Not authorized, token validation failed'));
        }
    }

    // If no token was found at all
    if (!token) {
        res.status(401);
        return next(new Error('Not authorized, no token provided in header'));
    }
};

module.exports = { protect };