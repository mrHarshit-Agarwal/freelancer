const Checkout = require('../../models/checkoutModel');


const createCheckout = async (req, res) => {
  try {
    const { userName, packageName, amount, couponCode, finalAmount, paymentMethod } = req.body;

    const checkout = new Checkout({
      userName,
      packageName,
      amount,
      couponCode,
      finalAmount,
      paymentMethod,
    });

    await checkout.save();
    res.status(201).json({ success: true, message: "Checkout created successfully", data: checkout });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating checkout", error: error.message });
  }
};


const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: checkouts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching checkouts", error: error.message });
  }
};


const getCheckoutBySlug = async (req, res) => {
  try {
    const checkout = await Checkout.findOne({ slug: req.params.slug });
    if (!checkout) {
      return res.status(404).json({ success: false, message: "Checkout not found" });
    }
    res.status(200).json({ success: true, data: checkout });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching checkout", error: error.message });
  }
};


const updateCheckout = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const checkout = await Checkout.findOne({ slug: req.params.slug });

    if (!checkout) {
      return res.status(404).json({ success: false, message: "Checkout not found" });
    }

    if (paymentStatus) {
      checkout.paymentStatus = paymentStatus;
    }

    await checkout.save();
    res.status(200).json({ success: true, message: "Checkout updated successfully", data: checkout });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating checkout", error: error.message });
  }
};


const deleteCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findOneAndDelete({ slug: req.params.slug });
    if (!checkout) {
      return res.status(404).json({ success: false, message: "Checkout not found" });
    }
    res.status(200).json({ success: true, message: "Checkout deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting checkout", error: error.message });
  }
};

module.exports = {
  createCheckout,
  getAllCheckouts,
  getCheckoutBySlug,
  updateCheckout,
  deleteCheckout,
};
