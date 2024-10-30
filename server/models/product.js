// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  href: { type: String, required: true },
  images: { type: [String], required: true }, // Array of image URLs
  imageAlt: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: [String], required: true }, // Array of colors
  sizes: { type: [String], required: true }, // Array of sizes
  type: { type: String, required: true },
  condition: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  owner: {type: String, require: true},
});

module.exports = mongoose.model('Product', productSchema);
