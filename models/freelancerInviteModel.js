const mongoose = require("mongoose");
const slugify = require("slugify");

const freelancerInviteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  hourlyRate: { type: Number, required: true },
  joinDate: { type: Date, required: true },
  recommendations: { type: Number, default: 0 },
  verifications: {
    phone: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    identity: { type: Boolean, default: false },
  },
  skills: [String],
  certifications: [String],
  categories: [String],
  rating: { type: Number, default: 0 },
  jobCompleted: { type: Number, default: 0 },
  hireRate: { type: Number, default: 0 },
  onTime: { type: Number, default: 0 },
  onBudget: { type: Number, default: 0 },
  about: { type: String, required: true },
  portfolio: [{ imageUrl: String, title: String }],
  reviews: [{ clientName: String, feedback: String, rating: Number }],
  createdAt: { type: Date, default: Date.now },
});

freelancerInviteSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name + "-" + Date.now(), { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("FreelancerInvite", freelancerInviteSchema);
