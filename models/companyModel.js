const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  socialLinks: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
