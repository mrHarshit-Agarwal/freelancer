const mongoose = require("mongoose");

const bidDetailSchema = new mongoose.Schema({
  title: String,
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
      description: String
    }
  ],
  bidders: [
    {
      name: String,
      skills: [String],
      image: String,
      description: String
    }
  ],
  reviews: [
    {
      clientName: String,
      clientImage: String,
      comment: String
    }
  ]
});

module.exports = mongoose.model("BidDetail", bidDetailSchema);
