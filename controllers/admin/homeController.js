const { HomeSlider, SubSlider, Category, Service, Home } = require('../../models/homeModel');

// HomeSlider
const createSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const slider = await HomeSlider.create({ ...req.body, image });
    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSliders = async (req, res) => {
  try {
    const sliders = await HomeSlider.find();
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await HomeSlider.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSlider = async (req, res) => {
  try {
    await HomeSlider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slider deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SubSlider
const createSubSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const slider = await SubSlider.create({ ...req.body, image });
    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubSliders = async (req, res) => {
  try {
    const sliders = await SubSlider.find();
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSubSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await SubSlider.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSubSlider = async (req, res) => {
  try {
    await SubSlider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sub slider deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Category
const createCategory = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const category = await Category.create({ ...req.body, image });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Service
const createService = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const service = await Service.create({ ...req.body, image });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all home data in one request
const getAllHomeData = async (req, res) => {
  try {
    const slider = await HomeSlider.find();
    const subSlider = await SubSlider.find();
    const category = await Category.find();
    const service = await Service.find();

    res.status(200).json({ slider, subSlider, category, service });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  // HomeSlider
  createSlider,
  getSliders,
  updateSlider,
  deleteSlider,

  // SubSlider
  createSubSlider,
  getSubSliders,
  updateSubSlider,
  deleteSubSlider,

  // Category
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,

  // Service
  createService,
  getServices,
  updateService,
  deleteService,

  // Get all data in one request
  getAllHomeData,
};
