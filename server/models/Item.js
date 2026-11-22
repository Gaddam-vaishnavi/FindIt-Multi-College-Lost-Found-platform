
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                'Electronics',
                'Accessories',
                'Books',
                'ID Cards',
                'Clothing',
                'Bags',
                'Keys',
                'Others'
            ]
        },

        type: {
            type: String,
            required: true,
            enum: ['lost', 'found']
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: Date,
            required: true
        },

        image: {
            type: String,
            default: ''
        },

        status: {
            type: String,
            enum: ['active', 'claimed', 'resolved'],
            default: 'active'
        },

        college: {
            type: String,
            required: true,
            trim: true
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Item', itemSchema);
