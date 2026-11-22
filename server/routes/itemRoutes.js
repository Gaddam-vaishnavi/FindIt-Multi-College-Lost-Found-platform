const express = require('express');
const router = express.Router();

const {
    createItem,
    getAllItems,
    searchItems,
    getItemById,
    updateItem,
    deleteItem,
    updateItemStatus
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

// Report lost or found item (Authenticated)
router.post('/', protect, createItem);

// Search items
router.get('/search', getAllItems);

// Browse all items
router.get('/', getAllItems);

// Get individual item details
router.get('/:id', getItemById);

// Update item (Owner or Admin)
router.put('/:id', protect, updateItem);

// Delete item (Owner or Admin)
router.delete('/:id', protect, deleteItem);

// Update item status specifically (Owner or Admin)
router.patch('/:id/status', protect, updateItemStatus);

module.exports = router;
