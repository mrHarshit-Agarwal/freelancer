const CategoryFilter = require('../../models/categoriesFilterModel');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const createCategory = async (req, res) => {
  try {
    const { title, clientName, price, rating, status } = req.body;
    const clientImage = req.files['clientImage']?.[0]?.filename || '';
    const categoryImage = req.files['categoryImage']?.[0]?.filename || '';

    const newCategory = new CategoryFilter({
      title,
      clientName,
      price,
      rating,
      status,
      categoryImage,
      clientImage
    });

    await newCategory.save();
    res.status(201).json({ success: true, message: 'Category created', data: newCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryFilter.find();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const category = await CategoryFilter.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await CategoryFilter.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ message: 'Not found' });

    const { title, clientName, price, rating, status } = req.body;

    if (title) {
      category.title = title;
      category.slug = slugify(title, { lower: true, strict: true });
    }

    if (clientName) category.clientName = clientName;
    if (typeof price !== "undefined") category.price = price;
    if (typeof rating !== "undefined") category.rating = rating;
    if (typeof status !== "undefined") category.status = status;

    if (req.files['clientImage']) {
      if (category.clientImage) {
        const oldClientImage = path.join('uploads/categoryfilter', category.clientImage);
        if (fs.existsSync(oldClientImage)) fs.unlinkSync(oldClientImage);
      }
      category.clientImage = req.files['clientImage'][0].filename;
    }

    if (req.files['categoryImage']) {
      if (category.categoryImage) {
        const oldCatImage = path.join('uploads/categoryfilter', category.categoryImage);
        if (fs.existsSync(oldCatImage)) fs.unlinkSync(oldCatImage);
      }
      category.categoryImage = req.files['categoryImage'][0].filename;
    }

    await category.save();
    res.json({ success: true, message: 'Category updated', data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryFilter.findOneAndDelete({ slug: req.params.slug });
    if (!category) return res.status(404).json({ message: 'Not found' });

    if (category.clientImage) {
      const img = path.join('uploads/categoryfilter', category.clientImage);
      if (fs.existsSync(img)) fs.unlinkSync(img);
    }

    if (category.categoryImage) {
      const img = path.join('uploads/categoryfilter', category.categoryImage);
      if (fs.existsSync(img)) fs.unlinkSync(img);
    }

    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
};
