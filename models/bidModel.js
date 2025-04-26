const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  title: String,
  description: String,
  bidCount: Number,
  bidType: String,
  duration: String, 
  minPrice: Number,
  maxPrice: Number,
  image: String
});

module.exports = mongoose.model("Bid", bidSchema);
