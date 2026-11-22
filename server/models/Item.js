const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Item title is required'],
            trim: true
        },

        description: {
            type: String,
            required: [true, 'Item description is required'],
            trim: true
        },

        category: {
            type: String,
            required: [true, 'Item category is required'],
            enum: {
                values: [
                    'Electronics',
                    'Accessories',
                    'Books',
                    'Books & Stationery',
                    'ID Cards',
                    'Clothing',
                    'Bags',
                    'Keys',
                    'Personal Items',
                    'Other',
                    'Others'
                ],
                message: '{VALUE} is not a supported category'
            }
        },

        type: {
            type: String,
            required: [true, 'Item type is required'],
            enum: {
                values: ['lost', 'found'],
                message: 'Type must be either lost or found'
            }
        },

        location: {
            type: String,
            required: [true, 'Specific location is required'],
            trim: true
        },

        date: {
            type: Date,
            required: [true, 'Item date is required']
        },

        image: {
            type: String,
            default: ''
        },

        status: {
            type: String,
            enum: {
                values: ['active', 'claim pending', 'claimed', 'resolved'],
                message: 'Status must be active, claim pending, claimed, or resolved'
            },
            default: 'active'
        },

        college: {
            type: String,
            required: [true, 'College name is required'],
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

// Indexes for searching and filtering
itemSchema.index({ title: 'text', description: 'text' });
itemSchema.index({ college: 1, type: 1, status: 1 });
itemSchema.index({ category: 1 });

module.exports = mongoose.model('Item', itemSchema);
