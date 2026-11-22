const Claim = require('../models/Claim');
const Item = require('../models/Item');
const Notification = require('../models/Notification');
const { isValidObjectId } = require('../utils/validateObjectId');

// Submit a claim on an item
const createClaim = async (req, res) => {
    try {
        const { itemId, identifyingInfo } = req.body;

        if (!itemId || !identifyingInfo) {
            return res.status(400).json({
                message: 'Item ID and identifying information/proof are required'
            });
        }

        if (!isValidObjectId(itemId)) {
            return res.status(400).json({
                message: 'Invalid item ID format'
            });
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        // Cannot claim already resolved or claimed items
        if (['claimed', 'resolved'].includes(item.status)) {
            return res.status(400).json({
                message: `Cannot claim an item that is already ${item.status}`
            });
        }

        // Cannot claim an item you reported yourself
        if (item.reportedBy.toString() === req.user._id.toString()) {
            return res.status(400).json({
                message: 'You cannot submit a claim on your own report'
            });
        }

        // Check for duplicate pending claim from the same student on this item
        const existingClaim = await Claim.findOne({
            item: itemId,
            claimant: req.user._id,
            status: 'pending'
        });

        if (existingClaim) {
            return res.status(409).json({
                message: 'You already have a pending claim for this item. Please await review.'
            });
        }

        const claim = await Claim.create({
            item: itemId,
            claimant: req.user._id,
            identifyingInfo: identifyingInfo.trim(),
            status: 'pending'
        });

        // Update item status to 'claim pending' if currently active
        if (item.status === 'active') {
            item.status = 'claim pending';
            await item.save();
        }

        // Create notification for the reporter of the item
        await Notification.create({
            recipient: item.reportedBy,
            title: 'New Claim Received',
            description: `${req.user.fullName} submitted a claim on your ${item.type} item: "${item.title}".`,
            category: item.type === 'lost' ? 'Lost Item Updates' : 'Found Item Updates',
            type: 'claim_received',
            item: item._id,
            claim: claim._id
        });

        const populatedClaim = await Claim.findById(claim._id)
            .populate('item', 'title category type location status college image')
            .populate('claimant', 'fullName email college studentId');

        return res.status(201).json({
            success: true,
            message: 'Claim submitted successfully and is pending review',
            claim: populatedClaim
        });

    } catch (error) {
        console.error('Create claim error:', error.message);
        return res.status(500).json({
            message: 'Server error while submitting claim'
        });
    }
};

// Get claims submitted by the current user
const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ claimant: req.user._id })
            .populate('item', 'title category type location status college image date')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: claims.length,
            claims
        });
    } catch (error) {
        console.error('Get my claims error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching your claims'
        });
    }
};

// Get claims received on items reported by current user
const getReceivedClaims = async (req, res) => {
    try {
        // Find all items reported by current user
        const userItems = await Item.find({ reportedBy: req.user._id }).select('_id');
        const userItemIds = userItems.map((item) => item._id);

        const claims = await Claim.find({ item: { $in: userItemIds } })
            .populate('item', 'title category type location status college image date')
            .populate('claimant', 'fullName email college studentId')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: claims.length,
            claims
        });
    } catch (error) {
        console.error('Get received claims error:', error.message);
        return res.status(500).json({
            message: 'Server error while fetching received claims'
        });
    }
};

// Get single claim details by ID
const getClaimById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid claim ID format'
            });
        }

        const claim = await Claim.findById(id)
            .populate('item')
            .populate('claimant', 'fullName email college studentId')
            .populate('reviewedBy', 'fullName email role');

        if (!claim) {
            return res.status(404).json({
                message: 'Claim not found'
            });
        }

        // Access check: claimant, item reporter, or admin
        const isClaimant = claim.claimant._id.toString() === req.user._id.toString();
        const isReporter = claim.item && claim.item.reportedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isClaimant && !isReporter && !isAdmin) {
            return res.status(403).json({
                message: 'You are not authorized to view this claim'
            });
        }

        return res.status(200).json({
            success: true,
            claim
        });

    } catch (error) {
        console.error('Get claim by ID error:', error.message);
        return res.status(500).json({
            message: 'Server error while retrieving claim'
        });
    }
};

// Review claim (Approve or Reject)
const reviewClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reviewNotes } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid claim ID format'
            });
        }

        if (!status || !['approved', 'rejected'].includes(status.toLowerCase())) {
            return res.status(400).json({
                message: 'Review status must be either "approved" or "rejected"'
            });
        }

        const claim = await Claim.findById(id).populate('item');
        if (!claim) {
            return res.status(404).json({
                message: 'Claim not found'
            });
        }

        if (claim.status !== 'pending') {
            return res.status(400).json({
                message: `This claim has already been ${claim.status}`
            });
        }

        const item = await Item.findById(claim.item._id);
        if (!item) {
            return res.status(404).json({
                message: 'Associated item report not found'
            });
        }

        // Authorization: only the item reporter or platform admin can review
        const isReporter = item.reportedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isReporter && !isAdmin) {
            return res.status(403).json({
                message: 'Only the item reporter or an authorized administrator can review claims'
            });
        }

        const normalizedStatus = status.toLowerCase();
        claim.status = normalizedStatus;
        claim.reviewedBy = req.user._id;
        claim.reviewNotes = reviewNotes ? reviewNotes.trim() : '';
        claim.reviewedAt = new Date();
        await claim.save();

        if (normalizedStatus === 'approved') {
            // Update item status to 'claimed'
            item.status = 'claimed';
            await item.save();

            // Automatically reject other pending claims for this item
            await Claim.updateMany(
                {
                    item: item._id,
                    _id: { $ne: claim._id },
                    status: 'pending'
                },
                {
                    status: 'rejected',
                    reviewNotes: 'Item was verified and awarded to another claimant.',
                    reviewedBy: req.user._id,
                    reviewedAt: new Date()
                }
            );

            // Notify the claimant of approval
            await Notification.create({
                recipient: claim.claimant,
                title: 'Claim Approved!',
                description: `Your claim for "${item.title}" was approved by the reporter. You may now coordinate handover.`,
                category: item.type === 'lost' ? 'Lost Item Updates' : 'Found Item Updates',
                type: 'claim_approved',
                item: item._id,
                claim: claim._id
            });

        } else if (normalizedStatus === 'rejected') {
            // Check if there are any remaining pending claims
            const remainingPending = await Claim.countDocuments({
                item: item._id,
                _id: { $ne: claim._id },
                status: 'pending'
            });

            // If no other claims remain pending, revert item status to 'active'
            if (remainingPending === 0 && item.status === 'claim pending') {
                item.status = 'active';
                await item.save();
            }

            // Notify claimant of rejection
            await Notification.create({
                recipient: claim.claimant,
                title: 'Claim Update: Not Approved',
                description: `Your claim for "${item.title}" was not approved. ${reviewNotes ? 'Notes: ' + reviewNotes : ''}`,
                category: item.type === 'lost' ? 'Lost Item Updates' : 'Found Item Updates',
                type: 'claim_rejected',
                item: item._id,
                claim: claim._id
            });
        }

        const updatedClaim = await Claim.findById(claim._id)
            .populate('item', 'title category type location status college image')
            .populate('claimant', 'fullName email college studentId')
            .populate('reviewedBy', 'fullName email role');

        return res.status(200).json({
            success: true,
            message: `Claim ${normalizedStatus} successfully`,
            claim: updatedClaim
        });

    } catch (error) {
        console.error('Review claim error:', error.message);
        return res.status(500).json({
            message: 'Server error while reviewing claim'
        });
    }
};

module.exports = {
    createClaim,
    getMyClaims,
    getReceivedClaims,
    getClaimById,
    reviewClaim
};
