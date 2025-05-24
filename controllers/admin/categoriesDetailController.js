const CategoryDetail = require("../../models/categoriesDetailModel");
const slugify = require("slugify");

// GET ALL
const getAllCategory = async (req, res) => {
  const items = await CategoryDetail.find();
  res.render("category-details", { items });
};

// GET ONE BY SLUG
const getOneCategory = async (req, res) => {
  const item = await CategoryDetail.findOne({ slug: req.params.slug });
  res.render("single-category", { item });
};

// CREATE
const createCategory = async (req, res) => {
  const { title, clientName, rating, ordersInQueue, price, description } = req.body;

  const sliderImages = req.files["sliderImages"]?.map(file => file.filename) || [];
  const clientAvatar = req.files["clientAvatar"]?.[0]?.filename || "";
  const documents = req.files["documents"]?.map(file => ({
    name: file.originalname,
    file: file.filename,
  })) || [];

  const newItem = new CategoryDetail({
    title,
    clientName,
    rating,
    ordersInQueue,
    price,
    description,
    sliderImages,
    clientAvatar,
    documents,
  });

  await newItem.save();
  res.redirect("/category-details");
};

// UPDATE BY SLUG
const updateCategory = async (req, res) => {
  const item = await CategoryDetail.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).send("Category not found");

  const { title, clientName, rating, ordersInQueue, price, description } = req.body;

  if (title) {
    item.title = title;
    item.slug = slugify(title, { lower: true, strict: true });
  }

  if (clientName) item.clientName = clientName;
  if (rating) item.rating = rating;
  if (ordersInQueue) item.ordersInQueue = ordersInQueue;
  if (price) item.price = price;
  if (description) item.description = description;

  if (req.files["sliderImages"]) {
    item.sliderImages = req.files["sliderImages"].map(file => file.filename);
  }

  if (req.files["clientAvatar"]) {
    item.clientAvatar = req.files["clientAvatar"][0].filename;
  }

  if (req.files["documents"]) {
    item.documents = req.files["documents"].map(file => ({
      name: file.originalname,
      file: file.filename,
    }));
  }

  await item.save();
  res.redirect("/category-details");
};

// DELETE BY SLUG
const deleteCategory = async (req, res) => {
  const item = await CategoryDetail.findOneAndDelete({ slug: req.params.slug });
  if (!item) return res.status(404).send("Category not found");
  res.redirect("/category-details");
};

module.exports = {
  getAllCategory,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
