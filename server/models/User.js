
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        college: {
            type: String,
            required: true,
            trim: true
        },
        studentId: {
    type: String,
    required: true,
    trim: true
},
resetPasswordToken: {
    type: String,
    default: null
},

resetPasswordExpires: {
    type: Date,
    default: null
},
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
