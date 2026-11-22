const User = require('../models/User');
const College = require('../models/College');
const Item = require('../models/Item');
const Claim = require('../models/Claim');
const { isValidObjectId } = require('../utils/validateObjectId');

// Admin Dashboard Overview Statistics
const getAdminDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalStudents,
            totalColleges,
            totalItems,
            totalLostReports,
            totalFoundReports,
            activeReports,
            claimedReports,
            resolvedReports,
            pendingClaimsCount,
            recentReports,
            recentUsers
        ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'student' }),
            College.countDocuments(),
            Item.countDocuments(),
            Item.countDocuments({ type: 'lost' }),
            Item.countDocuments({ type: 'found' }),
            Item.countDocuments({ status: 'active' }),
            Item.countDocuments({ status: 'claimed' }),
            Item.countDocuments({ status: 'resolved' }),
            Claim.countDocuments({ status: 'pending' }),
            Item.find()
                .sort({ createdAt: -1 })
                .limit(6)
                .populate('reportedBy', 'fullName email college'),
            User.find()
                .sort({ createdAt: -1 })
                .limit(6)
                .select('-password -resetPasswordToken -resetPasswordExpires')
        ]);

        return res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalStudents,
                totalColleges,
                totalItems,
                totalLostReports,
                totalFoundReports,
                activeReports,
                claimedReports,
                resolvedReports,
                pendingClaimsCount
            },
            recentReports,
            recentUsers
        });

    } catch (error) {
        console.error('Admin dashboard stats error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching admin dashboard statistics'
        });
    }
};

// Admin: Get all users with search, filter, pagination
const getAdminUsers = async (req, res) => {
    try {
        const { search, college, role, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (search && search.trim() !== '') {
            const trimmed = search.trim();
            filter.$or = [
                { fullName: { $regex: trimmed, $options: 'i' } },
                { email: { $regex: trimmed, $options: 'i' } },
                { studentId: { $regex: trimmed, $options: 'i' } }
            ];
        }

        if (college && college !== 'All') {
            filter.college = college.trim();
        }

        if (role && role !== 'All') {
            filter.role = role.trim();
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
        const skip = (pageNum - 1) * limitNum;

        const totalUsers = await User.countDocuments(filter);
        const users = await User.find(filter)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        return res.status(200).json({
            success: true,
            count: users.length,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limitNum) || 1,
            currentPage: pageNum,
            users
        });

    } catch (error) {
        console.error('Admin users error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching users'
        });
    }
};

// Admin: Get all items across the platform
const getAdminItems = async (req, res) => {
    try {
        const { search, college, type, status, category, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (search && search.trim() !== '') {
            const trimmed = search.trim();
            filter.$or = [
                { title: { $regex: trimmed, $options: 'i' } },
                { description: { $regex: trimmed, $options: 'i' } },
                { location: { $regex: trimmed, $options: 'i' } }
            ];
        }

        if (college && college !== 'All') {
            filter.college = college.trim();
        }

        if (type && type !== 'All') {
            filter.type = type.toLowerCase().trim();
        }

        if (status && status !== 'All') {
            filter.status = status.toLowerCase().trim();
        }

        if (category && category !== 'All') {
            filter.category = category.trim();
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
        const skip = (pageNum - 1) * limitNum;

        const totalItems = await Item.countDocuments(filter);
        const items = await Item.find(filter)
            .populate('reportedBy', 'fullName email college studentId')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        return res.status(200).json({
            success: true,
            count: items.length,
            totalItems,
            totalPages: Math.ceil(totalItems / limitNum) || 1,
            currentPage: pageNum,
            items
        });

    } catch (error) {
        console.error('Admin items error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching admin items'
        });
    }
};

// Admin: Get all claims across the platform
const getAdminClaims = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (status && status !== 'All') {
            filter.status = status.toLowerCase().trim();
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
        const skip = (pageNum - 1) * limitNum;

        const totalClaims = await Claim.countDocuments(filter);
        const claims = await Claim.find(filter)
            .populate('item', 'title category type location status college image date')
            .populate('claimant', 'fullName email college studentId')
            .populate('reviewedBy', 'fullName email role')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        return res.status(200).json({
            success: true,
            count: claims.length,
            totalClaims,
            totalPages: Math.ceil(totalClaims / limitNum) || 1,
            currentPage: pageNum,
            claims
        });

    } catch (error) {
        console.error('Admin claims error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching claims'
        });
    }
};

module.exports = {
    getAdminDashboardStats,
    getAdminUsers,
    getAdminItems,
    getAdminClaims
};
