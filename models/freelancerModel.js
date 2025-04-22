const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    description: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    hourlyRate: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Freelancer', freelancerSchema);
