const mongoose = require('mongoose');
const slugify = require('slugify'); 

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  email: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate slug from name
sellerSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Seller', sellerSchema);
