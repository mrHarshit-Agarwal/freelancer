const mongoose = require("mongoose");
const slugify = require("slugify");

const cartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  totalPrice: Number,
  image: String,
  slug: { type: String, unique: true },
});

cartSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


module.exports = mongoose.model("Cart", cartSchema);
