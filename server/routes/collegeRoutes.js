const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');

const {
    getAllColleges,
    getCollegeById,
    createCollege,
    updateCollege,
    updateCollegeStatus
} = require('../controllers/collegeController');

// Public: Get all active colleges
router.get('/', getAllColleges);

// Public: Get college by ID
router.get('/:id', getCollegeById);

// Admin-only: Create new college
router.post('/', protect, adminOnly, createCollege);

// Admin-only: Update college
router.put('/:id', protect, adminOnly, updateCollege);

// Admin-only: Update college active status
router.patch('/:id/status', protect, adminOnly, updateCollegeStatus);

module.exports = router;
