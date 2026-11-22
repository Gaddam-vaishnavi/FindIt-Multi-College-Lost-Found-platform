const jwt = require('jsonwebtoken');
const Item = require('../models/Item');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { isValidObjectId } = require('../utils/validateObjectId');

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
            image,
            college: requestedCollege
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
                message: 'Please provide all required item details: title, description, category, type, location, date.'
            });
        }

        // Validate item type
        const normalizedType = type.toLowerCase().trim();
        if (!['lost', 'found'].includes(normalizedType)) {
            return res.status(400).json({
                message: 'Type must be either lost or found'
            });
        }

        // Found items require an image
        if (normalizedType === 'found' && (!image || !image.trim())) {
            return res.status(400).json({
                message: 'A photo is required when reporting a found item'
            });
        }

        // Validate date is not in the future
        const itemDate = new Date(date);
        if (isNaN(itemDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid date format'
            });
        }
        if (itemDate > new Date()) {
            return res.status(400).json({
                message: 'Item date cannot be in the future'
            });
        }

        // Enforce user's registered college as report college for students
        // Only admins may override the college attribute
        let reportCollege = req.user.college;
        if (req.user.role === 'admin' && requestedCollege && requestedCollege.trim() !== '') {
            reportCollege = requestedCollege.trim();
        }

        if (!reportCollege) {
            return res.status(400).json({
                message: 'A valid college affiliation is required to report an item'
            });
        }

        // Create item
        const item = await Item.create({
            title: title.trim(),
            description: description.trim(),
            category,
            type: normalizedType,
            location: location.trim(),
            date: itemDate,
            image: image || '',
            college: reportCollege,
            status: 'active',
            reportedBy: req.user._id
        });

        const populatedItem = await Item.findById(item._id).populate(
            'reportedBy',
            'fullName email college studentId'
        );

        // Notify all admins of the same college about the new item report
        try {
            const collegeAdmins = await User.find({
                role: 'admin',
                college: { $regex: new RegExp(`^${reportCollege.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
            }).select('_id');

            if (collegeAdmins.length > 0) {
                const itemTypeLabel = normalizedType === 'lost' ? 'Lost' : 'Found';
                const notificationDocs = collegeAdmins.map((admin) => ({
                    recipient: admin._id,
                    title: `New ${itemTypeLabel} Item Report`,
                    description: `A student reported a ${normalizedType} item: ${item.title}.`,
                    category: normalizedType === 'lost' ? 'Lost Item Updates' : 'Found Item Updates',
                    type: 'item_report',
                    item: item._id
                }));
                await Notification.insertMany(notificationDocs);
            }
        } catch (notifError) {
            // Notification failure must not affect the item creation response
            console.error('Admin notification error (non-fatal):', notifError.message);
        }

        return res.status(201).json({
            success: true,
            message: `${normalizedType === 'lost' ? 'Lost' : 'Found'} item reported successfully`,
            item: populatedItem
        });

    } catch (error) {
        console.error('Create item error:', error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: 'Server error while reporting item'
        });
    }
};

// Get all items with search, filters, and pagination
const getAllItems = async (req, res) => {
    try {
        const {
            keyword,
            category,
            type,
            college,
            status,
            page = 1,
            limit = 12
        } = req.query;

        const filter = {};

        // Keyword search against title or description
        if (keyword && keyword.trim() !== '') {
            const trimmedKeyword = keyword.trim();
            filter.$or = [
                { title: { $regex: trimmedKeyword, $options: 'i' } },
                { description: { $regex: trimmedKeyword, $options: 'i' } },
                { location: { $regex: trimmedKeyword, $options: 'i' } }
            ];
        }

        // Category filter
        if (category && category !== 'All') {
            if (category === 'Books') {
                filter.category = { $in: ['Books', 'Books & Stationery'] };
            } else if (category === 'Books & Stationery') {
                filter.category = { $in: ['Books', 'Books & Stationery'] };
            } else if (category === 'Others' || category === 'Other' || category === 'Personal Items') {
                filter.category = { $in: ['Others', 'Other', 'Personal Items'] };
            } else {
                filter.category = category;
            }
        }

        // Type filter (lost / found)
        if (type && type !== 'All') {
            filter.type = type.toLowerCase().trim();
        }

        // College filter
        if (college && college !== 'All Campuses' && college !== 'All') {
            filter.college = { $regex: new RegExp(`^${college.trim()}$`, 'i') };
        }

        // Status filter
        if (status && status !== 'All') {
            filter.status = status.toLowerCase().trim();
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 12));
        const skip = (pageNum - 1) * limitNum;

        const totalItems = await Item.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limitNum) || 1;

        const items = await Item.find(filter)
            .populate('reportedBy', 'fullName college')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        return res.status(200).json({
            success: true,
            message: 'Items retrieved successfully',
            count: items.length,
            totalItems,
            totalPages,
            currentPage: pageNum,
            items
        });

    } catch (error) {
        console.error('Get items error:', error.message);
        return res.status(500).json({
            message: 'Server error while retrieving items'
        });
    }
};

// Search items endpoint (alias / convenience)
const searchItems = async (req, res) => {
    return getAllItems(req, res);
};

// Get individual item details by ID
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid item ID format'
            });
        }

        // Public responses include reporter fullName and college only
        const item = await Item.findById(id)
            .populate('reportedBy', 'fullName college');

        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        // If requester is authenticated and is the item owner or an admin, allow access to private details
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded && decoded.userId) {
                    const requestingUser = await User.findById(decoded.userId).select('role');
                    if (requestingUser) {
                        const isOwner = item.reportedBy && item.reportedBy._id.toString() === requestingUser._id.toString();
                        const isAdmin = requestingUser.role === 'admin';
                        if (isOwner || isAdmin) {
                            const fullReporter = await User.findById(item.reportedBy._id).select('fullName email college studentId');
                            if (fullReporter) {
                                item.reportedBy = fullReporter;
                            }
                        }
                    }
                }
            } catch (err) {
                // Token verification failed: proceed with public safe fields
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Item details retrieved successfully',
            item
        });

    } catch (error) {
        console.error('Get item error:', error.message);
        return res.status(500).json({
            message: 'Server error while retrieving item'
        });
    }
};

// Update item (Owner or Admin only)
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid item ID format'
            });
        }

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        // Ownership or Admin authorization check
        const isOwner = item.reportedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: 'You are not authorized to update this item report'
            });
        }

        const {
            title,
            description,
            category,
            type,
            location,
            date,
            image,
            status,
            college
        } = req.body;

        if (title !== undefined) item.title = title.trim();
        if (description !== undefined) item.description = description.trim();
        if (category !== undefined) item.category = category;
        if (type !== undefined) item.type = type.toLowerCase().trim();
        if (location !== undefined) item.location = location.trim();
        if (date !== undefined) item.date = new Date(date);
        if (image !== undefined) item.image = image;

        // If status is updated, validate valid status transition
        if (status !== undefined) {
            const validStatuses = ['active', 'claim pending', 'claimed', 'resolved'];
            const normalizedStatus = status.toLowerCase().trim();
            if (!validStatuses.includes(normalizedStatus)) {
                return res.status(400).json({
                    message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
                });
            }
            item.status = normalizedStatus;
        }

        // Only admin can change college of an existing report
        if (college !== undefined && isAdmin) {
            item.college = college.trim();
        }

        await item.save();

        const updated = await Item.findById(id).populate(
            'reportedBy',
            'fullName email college studentId'
        );

        return res.status(200).json({
            success: true,
            message: 'Item updated successfully',
            item: updated
        });

    } catch (error) {
        console.error('Update item error:', error.message);
        return res.status(500).json({
            message: 'Server error while updating item'
        });
    }
};

// Delete item (Owner or Admin only)
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid item ID format'
            });
        }

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        // Ownership or Admin authorization check
        const isOwner = item.reportedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: 'You are not authorized to delete this item report'
            });
        }

        await item.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Item deleted successfully'
        });

    } catch (error) {
        console.error('Delete item error:', error.message);
        return res.status(500).json({
            message: 'Server error while deleting item'
        });
    }
};

// Update item status specifically (Owner or Admin)
const updateItemStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid item ID format'
            });
        }

        if (!status) {
            return res.status(400).json({
                message: 'Status is required'
            });
        }

        const validStatuses = ['active', 'claim pending', 'claimed', 'resolved'];
        const normalizedStatus = status.toLowerCase().trim();

        if (!validStatuses.includes(normalizedStatus)) {
            return res.status(400).json({
                message: `Status must be one of: ${validStatuses.join(', ')}`
            });
        }

        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        const isOwner = item.reportedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: 'You are not allowed to change the status of this item'
            });
        }

        item.status = normalizedStatus;
        await item.save();

        return res.status(200).json({
            success: true,
            message: `Item status updated to ${normalizedStatus}`,
            item
        });

    } catch (error) {
        console.error('Update item status error:', error.message);
        return res.status(500).json({
            message: 'Server error while updating item status'
        });
    }
};

module.exports = {
    createItem,
    getAllItems,
    searchItems,
    getItemById,
    updateItem,
    deleteItem,
    updateItemStatus
};
