const jwt = require('jsonwebtoken');

/**
 * Generates and signs a JSON Web Token string
 * @param {string} userId - The object ID of the user from MongoDB
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Token expires in 30 days
    });
};

module.exports = generateToken;