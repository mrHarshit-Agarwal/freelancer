const CategoryFilter = require('../../models/categoriesFilterModel');

const createCategory = async (req, res) => {
  try {
    const { title, clientName, price, rating, status } = req.body;

    const newCategory = new CategoryFilter({
      title,
      clientName,
      price,
      rating,
      status,
      categoryImage: req.files['categoryImage']?.[0]?.filename || '',
      clientImage: req.files['clientImage']?.[0]?.filename || ''
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

const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryFilter.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      categoryImage: req.files['categoryImage']?.[0]?.filename,
      clientImage: req.files['clientImage']?.[0]?.filename
    };

    const category = await CategoryFilter.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!category) return res.status(404).json({ message: 'Not found' });

    res.json({ success: true, message: 'Category updated', data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await CategoryFilter.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {
    createCategory, 
    getAllCategories, 
    getCategoryById,
    updateCategory,
    deleteCategory

};
