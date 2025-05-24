const mongoose = require("mongoose");
const slugify = require("slugify");

const companyDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }
}, { timestamps: true });

companyDetailSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("CompanyDetail", companyDetailSchema);
