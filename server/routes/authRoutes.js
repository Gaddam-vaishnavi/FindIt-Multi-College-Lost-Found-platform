const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');

// Registration
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Current User Profile
router.get('/me', protect, getMe);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:token', resetPassword);

module.exports = router;
