const mongoose = require("mongoose");
const slugify = require("slugify");

const bidSchema = new mongoose.Schema({
  title: String,
  description: String,
  bidCount: Number,
  bidType: String,
  duration: String,
  minPrice: Number,
  maxPrice: Number,
  image: String,
  slug: { type: String, unique: true },
});

bidSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Bid", bidSchema);
