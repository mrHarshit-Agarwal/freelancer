const Cart = require("../../models/addCartModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

const createCartItem = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
    const image = req.file?.filename;
    const totalPrice = price * (quantity || 1);

    const item = new Cart({
      title,
      description,
      price,
      quantity,
      totalPrice,
      image,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCartItemBySlug = async (req, res) => {
  try {
    const item = await Cart.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: "Cart item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCartItemBySlug = async (req, res) => {
  try {
    const item = await Cart.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: "Cart item not found" });

    const { title, description, price, quantity } = req.body;

    if (title) {
      item.title = title;
      item.slug = slugify(title, { lower: true, strict: true });
    }

    if (description) item.description = description;
    if (typeof price !== "undefined") item.price = price;
    if (typeof quantity !== "undefined") item.quantity = quantity;

    item.totalPrice = (item.price || 0) * (item.quantity || 1);

    if (req.file) {
      if (item.image) {
        const oldPath = path.join("uploads/cart", item.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      item.image = req.file.filename;
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCartItemBySlug = async (req, res) => {
  try {
    const item = await Cart.findOneAndDelete({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: "Cart item not found" });

    if (item.image) {
      const imgPath = path.join("uploads/cart", item.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItemBySlug,
  updateCartItemBySlug,
  deleteCartItemBySlug
};
