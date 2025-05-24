const Category = require('../../models/categoryModel');
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

const createCategory = async (req, res) => {
  try {
    const { title, description, status, urlSlug } = req.body;
    const image = req.file ? req.file.filename : null;

    const category = new Category({
      title,
      description,
      status,
      urlSlug,
      image
    });

    await category.save();
    res.status(201).json({ success: true, message: "Category created", category });
  } catch (err) {
    res.status(500).json({ success: false, message: "Creation failed", error: err.message });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed", error: err.message });
  }
};


const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed", error: err.message });
  }
};


const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ success: false, message: "Not found" });

    const { title, description, status, urlSlug } = req.body;

    if (title) {
      category.title = title;
      category.slug = slugify(title, { lower: true, strict: true });
    }

    if (description) category.description = description;
    if (typeof status !== "undefined") category.status = status;
    if (urlSlug) category.urlSlug = urlSlug;

    if (req.file) {
      if (category.image) {
        fs.unlinkSync(path.join("uploads/category/", category.image));
      }
      category.image = req.file.filename;
    }

    await category.save();
    res.status(200).json({ success: true, message: "Updated", category });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed", error: err.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ slug: req.params.slug });
    if (!category) return res.status(404).json({ success: false, message: "Not found" });

    if (category.image) {
      fs.unlinkSync(path.join("uploads/category/", category.image));
    }

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
};
