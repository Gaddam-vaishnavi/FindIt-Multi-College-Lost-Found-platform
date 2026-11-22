const College = require('../models/College');
const { isValidObjectId } = require('../utils/validateObjectId');

// Get all active colleges (or all if admin requests)
const getAllColleges = async (req, res) => {
    try {
        const filter = {};

        // By default, only active colleges unless explicitly requested by an admin
        if (!req.query.all || req.query.all !== 'true') {
            filter.isActive = true;
        }

        const colleges = await College.find(filter)
            .select('name code location emailDomain description isActive createdAt')
            .sort({ name: 1 });

        return res.status(200).json({
            success: true,
            count: colleges.length,
            colleges
        });
    } catch (error) {
        console.error('Get colleges error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch colleges'
        });
    }
};

// Get college by ID
const getCollegeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid college ID format'
            });
        }

        const college = await College.findById(id);

        if (!college) {
            return res.status(404).json({
                message: 'College not found'
            });
        }

        return res.status(200).json({
            success: true,
            college
        });
    } catch (error) {
        console.error('Get college by ID error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching college'
        });
    }
};

// Create a new college (Admin only)
const createCollege = async (req, res) => {
    try {
        const { name, code, location, emailDomain, description } = req.body;

        if (!name || !code || !location) {
            return res.status(400).json({
                message: 'Name, code, and location are required'
            });
        }

        const trimmedName = name.trim();
        const trimmedCode = code.trim().toUpperCase();

        // Check for duplicates (case-insensitive name and code)
        const existingCollege = await College.findOne({
            $or: [
                { name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } },
                { code: trimmedCode }
            ]
        });

        if (existingCollege) {
            return res.status(409).json({
                message: 'A college with this name or code already exists'
            });
        }

        const college = await College.create({
            name: trimmedName,
            code: trimmedCode,
            location: location.trim(),
            emailDomain: emailDomain ? emailDomain.trim().toLowerCase() : '',
            description: description ? description.trim() : '',
            isActive: true
        });

        return res.status(201).json({
            success: true,
            message: 'College added successfully',
            college
        });

    } catch (error) {
        console.error('Create college error:', error.message);
        return res.status(500).json({
            message: 'Server error while creating college'
        });
    }
};

// Update college (Admin only)
const updateCollege = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, location, emailDomain, description, isActive } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid college ID format'
            });
        }

        const college = await College.findById(id);
        if (!college) {
            return res.status(404).json({
                message: 'College not found'
            });
        }

        // If name or code is changed, check for conflict with other colleges
        if (name || code) {
            const conflictCheck = {};
            const orConditions = [];

            if (name && name.trim().toLowerCase() !== college.name.toLowerCase()) {
                orConditions.push({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
            }

            if (code && code.trim().toUpperCase() !== college.code) {
                orConditions.push({ code: code.trim().toUpperCase() });
            }

            if (orConditions.length > 0) {
                conflictCheck.$or = orConditions;
                conflictCheck._id = { $ne: college._id };

                const conflict = await College.findOne(conflictCheck);
                if (conflict) {
                    return res.status(409).json({
                        message: 'Another college already uses this name or code'
                    });
                }
            }
        }

        if (name !== undefined) college.name = name.trim();
        if (code !== undefined) college.code = code.trim().toUpperCase();
        if (location !== undefined) college.location = location.trim();
        if (emailDomain !== undefined) college.emailDomain = emailDomain.trim().toLowerCase();
        if (description !== undefined) college.description = description.trim();
        if (isActive !== undefined) college.isActive = Boolean(isActive);

        await college.save();

        return res.status(200).json({
            success: true,
            message: 'College updated successfully',
            college
        });

    } catch (error) {
        console.error('Update college error:', error.message);
        return res.status(500).json({
            message: 'Server error while updating college'
        });
    }
};

// Activate / Deactivate college (Admin only)
const updateCollegeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid college ID format'
            });
        }

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({
                message: 'isActive status must be a boolean (true or false)'
            });
        }

        const college = await College.findById(id);
        if (!college) {
            return res.status(404).json({
                message: 'College not found'
            });
        }

        college.isActive = isActive;
        await college.save();

        return res.status(200).json({
            success: true,
            message: `College ${isActive ? 'activated' : 'deactivated'} successfully`,
            college
        });

    } catch (error) {
        console.error('Update college status error:', error.message);
        return res.status(500).json({
            message: 'Server error while updating college status'
        });
    }
};

module.exports = {
    getAllColleges,
    getCollegeById,
    createCollege,
    updateCollege,
    updateCollegeStatus
};
