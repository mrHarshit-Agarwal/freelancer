const Category = require('../../models/categoryModel');

const fs = require('fs');
const path = require('path');

const createCategory = async (req, res) => {
  try {
    const { title, description, status, urlSlug } = req.body;
    const image = req.file ? req.file.filename : null;

    const category = new Category({ title, description, status, urlSlug, image });
    await category.save();
    res.status(201).json({ success: true, message: 'Category created', category });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Creation failed', error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetch failed', error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { title, description, status, urlSlug } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Not found' });

    if (req.file && category.image) {
      fs.unlinkSync(path.join('uploads/category/', category.image));
    }

    category.title = title || category.title;
    category.description = description || category.description;
    category.status = status ?? category.status;
    category.urlSlug = urlSlug || category.urlSlug;
    if (req.file) category.image = req.file.filename;

    await category.save();
    res.status(200).json({ success: true, message: 'Updated', category });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed', error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Not found' });

    if (category.image) {
      fs.unlinkSync(path.join('uploads/category/', category.image));
    }

    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed', error: err.message });
  }
};
module.exports = {
    createCategory, 
    getAllCategories, 
    getCategoryById,
    updateCategory,
    deleteCategory

};