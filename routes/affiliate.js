const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const AffiliateLink = require('../models/AffiliateLink');
const User = require('../models/User');

// Generate affiliate link
router.post('/generate-link', authenticateToken, async (req, res) => {
  try {
    const { productId, videoId, originalLink, commissionRate = 5 } = req.body;

    if (!originalLink) {
      return res.status(400).json({
        success: false,
        message: 'Original link is required',
      });
    }

    const shortLink = generateShortLink();

    const affiliateLink = new AffiliateLink({
      affiliateId: req.user.id,
      productId,
      videoId,
      originalLink,
      shortLink,
      commissionRate,
    });

    await affiliateLink.save();

    res.status(201).json({
      success: true,
      message: 'Affiliate link generated successfully',
      link: affiliateLink,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all affiliate links for user
router.get('/links', authenticateToken, async (req, res) => {
  try {
    const affiliateLinks = await AffiliateLink.find({ affiliateId: req.user.id })
      .populate('productId')
      .populate('videoId');

    res.json({
      success: true,
      links: affiliateLinks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get link details
router.get('/:linkId', async (req, res) => {
  try {
    const link = await AffiliateLink.findById(req.params.linkId)
      .populate('affiliateId', 'name email')
      .populate('productId')
      .populate('videoId');

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    res.json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update link performance
router.put('/:linkId', authenticateToken, async (req, res) => {
  try {
    const { clicks, conversions, revenue } = req.body;
    const link = await AffiliateLink.findById(req.params.linkId);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    if (link.affiliateId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (clicks !== undefined) link.clicks += clicks;
    if (conversions !== undefined) link.conversions += conversions;
    if (revenue !== undefined) link.revenue += revenue;

    await link.save();

    res.json({
      success: true,
      message: 'Link updated successfully',
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Deactivate link
router.post('/:linkId/deactivate', authenticateToken, async (req, res) => {
  try {
    const link = await AffiliateLink.findById(req.params.linkId);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found',
      });
    }

    if (link.affiliateId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    link.isActive = false;
    await link.save();

    res.json({
      success: true,
      message: 'Link deactivated successfully',
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get leaderboard
router.get('/leaderboard/top', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const topAffiliates = await AffiliateLink.aggregate([
      {
        $group: {
          _id: '$affiliateId',
          totalRevenue: { $sum: '$revenue' },
          totalClicks: { $sum: '$clicks' },
          totalConversions: { $sum: '$conversions' },
          linksCount: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
    ]);

    res.json({
      success: true,
      leaderboard: topAffiliates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Helper function
function generateShortLink() {
  return 'af-' + Math.random().toString(36).substring(2, 15);
}

module.exports = router;
