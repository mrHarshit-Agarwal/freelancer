const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  title: {
    String
  },
  description:
  {
    String},
  price: {
    Number
  },
  quantity: {
    type: Number, 
    default: 1
 },
  totalPrice: {
    Number
},
  image: {
    String
}
});

module.exports = mongoose.model("Cart", cartSchema);
