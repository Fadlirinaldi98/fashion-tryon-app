const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, sort = '-createdAt', limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (category) query.category = category;

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
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

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create product (Admin only)
router.post(
  '/',
  authenticateToken,
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('externalLink').isURL().withMessage('Valid external link is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, description, price, category, sizes, colors, brand, externalLink, image } =
        req.body;

      const product = new Product({
        name,
        description,
        price,
        category,
        sizes: sizes ? sizes.split(',') : [],
        colors: colors ? colors.split(',') : [],
        brand,
        externalLink,
        image,
      });

      await product.save();

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Update product
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category, sizes, colors, brand, image, inStock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        sizes: sizes ? sizes.split(',') : undefined,
        colors: colors ? colors.split(',') : undefined,
        brand,
        image,
        inStock,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
