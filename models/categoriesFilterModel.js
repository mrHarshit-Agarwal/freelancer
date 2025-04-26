// models/categoryModel.js
const mongoose = require('mongoose');

const categoryFilterSchema = new mongoose.Schema({
  title: String,
  price: Number,
  rating: Number,
  clientName: String,
  clientImage: String,
  categoryImage: String,
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('CategoryFilter', categoryFilterSchema);
