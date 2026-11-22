
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
            fullName,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            college,
            studentId,
            role: 'student' // Default role
        });

        return res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                college: user.college,
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

        // Use the same response whether the account exists or not.
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

        // Create the password reset URL
        const resetUrl =
            `http://localhost:5173/reset-password/${resetToken}`;

        // Send the reset email
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

        return res.status(200).json({
            success: true,
            message: successMessage
        });

    } catch (error) {
        console.error('Forgot password error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to process password reset request.'
        });
    }
};
module.exports = {
    registerUser,
    loginUser,
    forgotPassword
};
