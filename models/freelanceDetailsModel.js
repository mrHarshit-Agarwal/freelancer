const mongoose = require("mongoose");

const freelancerDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    certifications: {
      type: [String],
      default: [],
    },
    verifications: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    stats: {
      completedProjects: { type: Number, default: 0 },
      ongoingProjects: { type: Number, default: 0 },
    },
    portfolio: {
      type: [String],
      default: [],
    },
    reviews: [
      {
        reviewer: { type: String },
        comment: { type: String },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FreelancerDetail", freelancerDetailSchema);
