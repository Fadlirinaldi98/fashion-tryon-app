const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    image: String,
    category: {
      type: String,
      enum: ['dress', 'shirt', 'jacket', 'shoes', 'accessories', 'other'],
      default: 'other',
    },
    sizes: [String],
    colors: [String],
    brand: String,
    externalLink: {
      type: String,
      required: true,
    },
    affiliateLinks: [
      {
        affiliateId: mongoose.Schema.Types.ObjectId,
        link: String,
        platform: String,
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
