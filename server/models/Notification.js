const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Notification recipient is required']
        },

        title: {
            type: String,
            required: [true, 'Notification title is required'],
            trim: true
        },

        description: {
            type: String,
            required: [true, 'Notification description is required'],
            trim: true
        },

        category: {
            type: String,
            enum: ['Lost Item Updates', 'Found Item Updates', 'Claim Updates', 'General'],
            default: 'General'
        },

        type: {
            type: String,
            enum: ['claim_received', 'claim_approved', 'claim_rejected', 'status_change', 'item_report', 'general'],
            default: 'general'
        },

        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },

        claim: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Claim'
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
