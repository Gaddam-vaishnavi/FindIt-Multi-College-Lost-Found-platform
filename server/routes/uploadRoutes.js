const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Upload single image (Authenticated users)
router.post('/', protect, (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: err.message || 'Image upload failed'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Please select an image file to upload'
            });
        }

        // Return relative URL so frontend can load it from backend host
        const imageUrl = `/uploads/${req.file.filename}`;

        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            url: imageUrl,
            filename: req.file.filename,
            size: req.file.size
        });
    });
});

module.exports = router;
