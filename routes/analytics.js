const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Analytics = require('../models/Analytics');
const Video = require('../models/Video');
const AffiliateLink = require('../models/AffiliateLink');

// Get video analytics
router.get('/videos/:videoId', authenticateToken, async (req, res) => {
  try {
    const { videoId } = req.params;
    const { period = '7d' } = req.query;

    // Get date range
    const dateRange = getPeriodRange(period);

    const analytics = await Analytics.findOne({
      videoId,
      date: { $gte: dateRange.start, $lte: dateRange.end },
    });

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    res.json({
      success: true,
      analytics: {
        videoId,
        views: video.views,
        likes: video.likes,
        shares: video.shares,
        clicks: video.clicks,
        conversions: video.conversions,
        engagement: analytics ? analytics.engagement : {},
        platforms: analytics ? analytics.platforms : {},
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get dashboard stats
router.get('/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;

    const dateRange = getPeriodRange(period);

    // Get user's videos
    const videos = await Video.find({ creator: userId });
    const videoIds = videos.map((v) => v._id);

    // Get analytics
    const analytics = await Analytics.find({
      videoId: { $in: videoIds },
      date: { $gte: dateRange.start, $lte: dateRange.end },
    });

    // Get affiliate stats
    const affiliateLinks = await AffiliateLink.find({ affiliateId: userId });

    const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
    const totalClicks = videos.reduce((sum, v) => sum + v.clicks, 0);
    const totalConversions = videos.reduce((sum, v) => sum + v.conversions, 0);
    const totalRevenue = affiliateLinks.reduce((sum, l) => sum + l.revenue, 0);

    res.json({
      success: true,
      stats: {
        totalVideos: videos.length,
        totalViews,
        totalClicks,
        totalConversions,
        conversionRate:
          totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) + '%' : '0%',
        totalRevenue: totalRevenue.toFixed(2),
        affiliateLinksCount: affiliateLinks.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get earnings
router.get('/earnings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const affiliateLinks = await AffiliateLink.find({ affiliateId: userId });

    const totalEarnings = affiliateLinks.reduce((sum, link) => sum + link.revenue, 0);
    const totalClicks = affiliateLinks.reduce((sum, link) => sum + link.clicks, 0);
    const totalConversions = affiliateLinks.reduce((sum, link) => sum + link.conversions, 0);

    res.json({
      success: true,
      earnings: {
        totalEarnings: totalEarnings.toFixed(2),
        totalClicks,
        totalConversions,
        links: affiliateLinks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Helper function
function getPeriodRange(period) {
  const end = new Date();
  const start = new Date();

  const periodMap = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
    '1y': 365,
  };

  start.setDate(start.getDate() - (periodMap[period] || 7));
  return { start, end };
}

module.exports = router;
