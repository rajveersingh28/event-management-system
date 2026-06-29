/**
 * Admin Middleware: Blocks users who lack an administrator role
 */
const admin = (req, res, next) => {
    // req.user is set by the protect middleware executed before this step
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403); // Forbidden access
        return next(new Error('Access denied. Administrator privileges required.'));
    }
};

module.exports = { admin };