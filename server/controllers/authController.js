const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            college,
            studentId
        } = req.body;

        // Check required fields
        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword ||
            !college ||
            !studentId
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                message: 'Please provide a valid email address'
            });
        }

        // Password length check
        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long'
            });
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        // Check whether email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email is already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            college: college.trim(),
            studentId: studentId.trim(),
            role: 'student'
        });

        return res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                college: user.college,
                studentId: user.studentId,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error.message);
        return res.status(500).json({
            message: 'Server error during registration'
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Compare entered password with hashed password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            }
        );

        // Send successful response
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                college: user.college,
                studentId: user.studentId,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({
            message: 'Server error during login'
        });
    }
};

// Get current logged-in user
const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'User authenticated successfully',
            user: req.user
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error retrieving user profile'
        });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required.'
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        const successMessage =
            'If an account exists with this email, a password reset link will be sent.';

        if (!user) {
            return res.status(200).json({
                success: true,
                message: successMessage
            });
        }

        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Store only the hashed token in MongoDB
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Link expires after 15 minutes
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Create the password reset URL using configured client URL
        const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

        // Attempt to send reset email
        try {
            await sendEmail({
                email: user.email,
                subject: 'FindIt - Password Reset',
                message: `
                    <h2>Password Reset Request</h2>
                    <p>You requested to reset your FindIt password.</p>
                    <p>Click the link below to create a new password:</p>
                    <a href="${resetUrl}">Reset My Password</a>
                    <p>This link expires in 15 minutes.</p>
                    <p>If you did not request this, ignore this email.</p>
                `
            });
        } catch (emailError) {
            console.warn('Email dispatch warning (SMTP might not be configured):', emailError.message);
        }

        return res.status(200).json({
            success: true,
            message: successMessage
        });

    } catch (error) {
        console.error('Forgot password error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Unable to process password reset request.'
        });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (!token) {
            return res.status(400).json({
                message: 'Reset token is required.'
            });
        }

        if (!password || !confirmPassword) {
            return res.status(400).json({
                message: 'New password and confirmation are required.'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long.'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match.'
            });
        }

        // Hash the incoming token to match database
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired password reset token.'
            });
        }

        // Set new password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password reset successful. You may now log in.'
        });

    } catch (error) {
        console.error('Reset password error:', error.message);
        return res.status(500).json({
            message: 'Server error during password reset.'
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword
};
