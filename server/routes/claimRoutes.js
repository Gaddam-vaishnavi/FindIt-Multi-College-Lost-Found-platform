const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    createClaim,
    getMyClaims,
    getReceivedClaims,
    getClaimById,
    reviewClaim
} = require('../controllers/claimController');

// All claim endpoints require authentication
router.post('/', protect, createClaim);
router.get('/my', protect, getMyClaims);
router.get('/received', protect, getReceivedClaims);
router.get('/:id', protect, getClaimById);
router.patch('/:id/review', protect, reviewClaim);

module.exports = router;
