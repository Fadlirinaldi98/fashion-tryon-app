const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Video = require('../models/Video');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all videos
router.get('/', async (req, res) => {
  try {
    const { status = 'published', sort = '-createdAt', limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const query = { status };
    const videos = await Video.find(query)
      .populate('creator', 'name avatar')
      .populate('products')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Video.countDocuments(query);

    res.json({
      success: true,
      videos,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('creator', 'name avatar bio')
      .populate('products');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    res.json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Upload video
router.post('/upload', authenticateToken, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No video file provided',
      });
    }

    const { title, description, category, products, tags } = req.body;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_large(
      req.file.buffer,
      {
        resource_type: 'video',
        public_id: `fashion-tryon/${Date.now()}`,
        folder: 'fashion-tryon/videos',
      }
    );

    // Create video record
    const video = new Video({
      title,
      description,
      category,
      tags: tags ? tags.split(',') : [],
      products: products ? products.split(',') : [],
      creator: req.user.id,
      videoUrl: result.secure_url,
      duration: result.duration,
      status: 'draft',
    });

    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video uploaded successfully',
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update video
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    if (video.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this video',
      });
    }

    const { title, description, category, tags, status, products } = req.body;

    Object.assign(video, {
      title: title || video.title,
      description: description || video.description,
      category: category || video.category,
      tags: tags ? tags.split(',') : video.tags,
      status: status || video.status,
      products: products ? products.split(',') : video.products,
    });

    await video.save();

    res.json({
      success: true,
      message: 'Video updated successfully',
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete video
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    if (video.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this video',
      });
    }

    await Video.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
