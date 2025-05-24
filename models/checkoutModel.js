const mongoose = require("mongoose");
const slugify = require("slugify");

const checkoutSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  couponCode: {
    type: String,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "UPI"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
});


checkoutSchema.pre("save", function (next) {
  if (this.isModified("userName") || this.isNew) {
    this.slug = slugify(`${this.userName}-${Date.now()}`, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("Checkout", checkoutSchema);
