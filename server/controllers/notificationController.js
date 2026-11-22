const Notification = require('../models/Notification');
const { isValidObjectId } = require('../utils/validateObjectId');

// Get all notifications for current logged-in user
const getMyNotifications = async (req, res) => {
    try {
        const { unreadOnly } = req.query;
        const filter = { recipient: req.user._id };

        if (unreadOnly === 'true') {
            filter.isRead = false;
        }

        const notifications = await Notification.find(filter)
            .sort({ createdAt: -1 })
            .limit(100);

        const unreadCount = await Notification.countDocuments({
            recipient: req.user._id,
            isRead: false
        });

        return res.status(200).json({
            success: true,
            count: notifications.length,
            unreadCount,
            notifications
        });

    } catch (error) {
        console.error('Get notifications error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching notifications'
        });
    }
};

// Get unread notification count
const getUnreadCount = async (req, res) => {
    try {
        const unreadCount = await Notification.countDocuments({
            recipient: req.user._id,
            isRead: false
        });

        return res.status(200).json({
            success: true,
            unreadCount
        });

    } catch (error) {
        console.error('Get unread count error:', error.message);
        return res.status(500).json({
            message: 'Server error while counting unread notifications'
        });
    }
};

// Mark single notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid notification ID format'
            });
        }

        const notification = await Notification.findOne({
            _id: id,
            recipient: req.user._id
        });

        if (!notification) {
            return res.status(404).json({
                message: 'Notification not found'
            });
        }

        notification.isRead = true;
        await notification.save();

        return res.status(200).json({
            success: true,
            message: 'Notification marked as read',
            notification
        });

    } catch (error) {
        console.error('Mark as read error:', error.message);
        return res.status(500).json({
            message: 'Server error while updating notification'
        });
    }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user._id, isRead: false },
            { isRead: true }
        );

        return res.status(200).json({
            success: true,
            message: 'All notifications marked as read'
        });

    } catch (error) {
        console.error('Mark all as read error:', error.message);
        return res.status(500).json({
            message: 'Server error while updating notifications'
        });
    }
};

// Delete notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid notification ID format'
            });
        }

        const notification = await Notification.findOneAndDelete({
            _id: id,
            recipient: req.user._id
        });

        if (!notification) {
            return res.status(404).json({
                message: 'Notification not found or unauthorized'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Notification deleted successfully'
        });

    } catch (error) {
        console.error('Delete notification error:', error.message);
        return res.status(500).json({
            message: 'Server error while deleting notification'
        });
    }
};

module.exports = {
    getMyNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
};
