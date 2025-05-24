const mongoose = require("mongoose");
const slugify = require("slugify");

const freelancerDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  title: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  profileImage: { type: String },
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
  verifications: { type: [String], default: [] },
  rating: { type: Number, min: 0, max: 5 },
  stats: {
    completedProjects: { type: Number, default: 0 },
    ongoingProjects: { type: Number, default: 0 },
  },
  portfolio: { type: [String], default: [] },
  reviews: [
    {
      reviewer: String,
      comment: String,
      rating: { type: Number, min: 0, max: 5 },
    },
  ],
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
}, { timestamps: true });

freelancerDetailSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name + "-" + Date.now(), { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("FreelancerDetail", freelancerDetailSchema);
