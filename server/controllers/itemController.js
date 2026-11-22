
const Item = require('../models/Item');

// Report a lost or found item
const createItem = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            type,
            location,
            date,
            image
        } = req.body;

        // Validate required fields
        if (
            !title ||
            !description ||
            !category ||
            !type ||
            !location ||
            !date
        ) {
            return res.status(400).json({
                message: 'Please provide all required item details'
            });
        }

        // Validate item type
        if (!['lost', 'found'].includes(type)) {
            return res.status(400).json({
                message: 'Type must be lost or found'
            });
        }

        // Create item
        const item = await Item.create({
            title,
            description,
            category,
            type,
            location,
            date,
            image: image || '',
            college: req.user.college,
            reportedBy: req.user._id
        });

        return res.status(201).json({
            message: `${type} item reported successfully`,
            item
        });

    } catch (error) {
        console.error('Create item error:', error.message);

        return res.status(500).json({
            message: 'Server error while reporting item'
        });
    }
};


const getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate('reportedBy', 'fullName email')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Items retrieved successfully',
            count: items.length,
            items
        });

    } catch (error) {
        console.error('Get items error:', error.message);

        return res.status(500).json({
            message: 'Server error while retrieving items'
        });
    }
};

const searchItems = async (req, res) => {
    try {
        const { keyword, category, type, college, status } = req.query;

        const filter = {};

        // Search by item title or description
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (category) filter.category = category;
        if (type) filter.type = type;
        if (college) filter.college = college;
        if (status) filter.status = status;

        const items = await Item.find(filter)
            .populate('reportedBy', 'fullName email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Search results retrieved successfully',
            count: items.length,
            items
        });

    } catch (error) {
        console.error('Search error:', error.message);

        res.status(500).json({
            message: 'Server error while searching items'
        });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('reportedBy', 'fullName email');

        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        return res.status(200).json({
            message: 'Item details retrieved successfully',
            item
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid item ID'
            });
        }

        console.error('Get item error:', error.message);

        return res.status(500).json({
            message: 'Server error while retrieving item'
        });
    }
};

const updateItem = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            type,
            location,
            date,
            image,
            status
        } = req.body;

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        // Only the student who created the report can update it
        if (item.reportedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not allowed to update this item'
            });
        }

        if (title !== undefined) item.title = title;
        if (description !== undefined) item.description = description;
        if (category !== undefined) item.category = category;
        if (type !== undefined) item.type = type;
        if (location !== undefined) item.location = location;
        if (date !== undefined) item.date = date;
        if (image !== undefined) item.image = image;
        if (status !== undefined) item.status = status;

        await item.save();

        return res.status(200).json({
            message: 'Item updated successfully',
            item
        });

    } catch (error) {
        console.error('Update item error:', error.message);

        return res.status(500).json({
            message: 'Server error while updating item'
        });
    }
};

const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        // Only the student who created the report can delete it
        if (item.reportedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not allowed to delete this item'
            });
        }

        await item.deleteOne();

        return res.status(200).json({
            message: 'Item deleted successfully'
        });

    } catch (error) {
        console.error('Delete item error:', error.message);

        return res.status(500).json({
            message: 'Server error while deleting item'
        });
    }
};

module.exports = { createItem, getAllItems, searchItems, getItemById, updateItem, deleteItem };
