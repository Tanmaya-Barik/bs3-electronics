const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    default: 'BS3'
  },
  category: {
    type: String,
    required: true,
    default: 'Accessories'
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discountPercent: {
    type: Number,
    default: 15
  },
  specs: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  reviewsCount: {
    type: Number,
    default: 128
  },
  image: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
