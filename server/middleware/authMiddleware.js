const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token;

        // Get token from Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                message: 'Not authorized. Please login first.'
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in MongoDB, exclude sensitive fields
        const user = await User.findById(decoded.userId).select(
            '-password -resetPasswordToken -resetPasswordExpires'
        );

        if (!user) {
            return res.status(401).json({
                message: 'User no longer exists'
            });
        }

        // Attach user details to request
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

// Admin authorization middleware
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Access denied. Administrator privileges required.'
        });
    }
    next();
};

module.exports = { protect, adminOnly };
