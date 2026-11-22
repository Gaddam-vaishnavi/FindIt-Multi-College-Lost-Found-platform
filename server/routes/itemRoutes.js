
const express = require('express');
const router = express.Router();

const {
    createItem,
    getAllItems,
    searchItems,
    getItemById,
    updateItem,
    deleteItem
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

// Report lost or found item
router.post('/', protect, createItem);

// Search items
router.get('/search', protect, searchItems);

// Browse all items
router.get('/', protect, getAllItems);

// Get individual item details
router.get('/:id', protect, getItemById);

// Update item
router.put('/:id', protect, updateItem);

// Delete item
router.delete('/:id', protect, deleteItem);

module.exports = router;
