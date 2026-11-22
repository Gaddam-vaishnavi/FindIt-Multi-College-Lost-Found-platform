
const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        emailDomain: {
            type: String,
            trim: true,
            lowercase: true
        },

        description: {
            type: String,
            default: ''
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('College', collegeSchema);
