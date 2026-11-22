
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    forgotPassword
} = require('../controllers/authController');

// Registration
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
// Get logged-in user's profile
router.get('/me', protect, async (req, res) => {
    res.status(200).json({
        message: 'User authenticated successfully',
        user: req.user
    });
});

module.exports = router;
