const mongoose = require('mongoose');
const slugify = require('slugify');

const categoryFilterSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  rating: { type: Number },
  clientName: { type: String },
  clientImage: { type: String },
  categoryImage: { type: String },
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true }
});

categoryFilterSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('CategoryFilter', categoryFilterSchema);
