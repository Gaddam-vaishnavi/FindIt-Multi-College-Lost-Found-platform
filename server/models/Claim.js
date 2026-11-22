const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: [true, 'Item reference is required']
        },

        claimant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Claimant is required']
        },

        identifyingInfo: {
            type: String,
            required: [true, 'Please provide identifying information or proof of ownership'],
            trim: true
        },

        status: {
            type: String,
            enum: {
                values: ['pending', 'approved', 'rejected'],
                message: 'Status must be pending, approved, or rejected'
            },
            default: 'pending'
        },

        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        reviewNotes: {
            type: String,
            trim: true,
            default: ''
        },

        reviewedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

claimSchema.index({ item: 1, claimant: 1, status: 1 });

module.exports = mongoose.model('Claim', claimSchema);
