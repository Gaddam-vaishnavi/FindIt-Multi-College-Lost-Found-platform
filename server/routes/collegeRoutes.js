const express = require('express');
const router = express.Router();

const { getAllColleges } = require('../controllers/collegeController');

// Get all active colleges
router.get('/', getAllColleges);

module.exports = router;