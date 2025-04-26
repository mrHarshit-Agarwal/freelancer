const mongoose = require("mongoose");

const categoryDetailSchema = new mongoose.Schema({
  title: { String},
  clientName: {String},
  clientAvatar: {String},
  rating: {Number},
  ordersInQueue: {Number},
  price:{ Number},
  description: {String},
  sliderImages: [String],
  sellerReviews: [
    {
      name: String,
      post: String,
      avatar: String,
      message: String
    }
  ],
  documents: [
    {
      name: String,
      file: String
    }
  ]
});

module.exports = mongoose.model("CategoryDetail", categoryDetailSchema);
