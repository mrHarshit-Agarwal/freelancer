const mongoose = require("mongoose");
const slugify = require("slugify");

const categoryDetailSchema = new mongoose.Schema({
  title: { type: String },
  clientName: { type: String },
  clientAvatar: { type: String },
  rating: { type: Number },
  ordersInQueue: { type: Number },
  price: { type: Number },
  description: { type: String },
  sliderImages: [String],
  sellerReviews: [
    {
      name: String,
      post: String,
      avatar: String,
      message: String,
    },
  ],
  documents: [
    {
      name: String,
      file: String,
    },
  ],
  slug: { type: String, unique: true },
});

categoryDetailSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("CategoryDetail", categoryDetailSchema);



