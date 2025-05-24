const mongoose = require("mongoose");
const slugify = require("slugify");

const bidDetailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  minPrice: Number,
  maxPrice: Number,
  duration: String,
  rateType: String,
  image: String,
  publisher: {
    name: String,
    image: String,
    rating: Number,
    description: String,
  },
  packages: [
    {
      type: String,
      price: Number,
      duration: String,
      description: String,
    }
  ],
  bidders: [
    {
      name: String,
      skills: [String],
      image: String,
      description: String,
    }
  ],
  reviews: [
    {
      clientName: String,
      clientImage: String,
      comment: String,
    }
  ],
  slug: {
    type: String,
    unique: true,
  }
});

bidDetailSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("BidDetail", bidDetailSchema);
