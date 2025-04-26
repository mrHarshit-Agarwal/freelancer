const Cart = require("../../models/addCartModel");

const addToCart = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
    const image = req.file?.filename;
    const totalPrice = price * quantity;

    const item = new Cart({
      title,
      description,
      price,
      quantity,
      totalPrice,
      image
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCart = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    if (updateData.quantity && updateData.price) {
      updateData.totalPrice = updateData.quantity * updateData.price;
    }

    const item = await Cart.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  getCartById,
  updateCart,
  deleteCart
};
