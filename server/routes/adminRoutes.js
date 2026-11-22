const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');

const {
    getAdminDashboardStats,
    getAdminUsers,
    getAdminItems,
    getAdminClaims
} = require('../controllers/adminController');

// All admin routes strictly require both authentication and admin role
router.use(protect, adminOnly);

router.get('/dashboard', getAdminDashboardStats);
router.get('/users', getAdminUsers);
router.get('/items', getAdminItems);
router.get('/claims', getAdminClaims);

module.exports = router;
