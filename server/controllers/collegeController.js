const College = require('../models/College');

// Get all active colleges
const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find({ isActive: true })
            .select('name code location emailDomain')
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: colleges.length,
            colleges
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch colleges',
            error: error.message
        });
    }
};

module.exports = { getAllColleges };