const CategoryDetail = require("../../models/categoriesDetailModel");

const getAllCategory = async (req, res) => {
  const items = await CategoryDetail.find();
  res.render("category-details", { items });
};

const getOneCategory = async (req, res) => {
  const item = await CategoryDetail.findById(req.params.id);
  res.render("single-category", { item });
};

const createCategory = async (req, res) => {
  const { title, clientName, rating, ordersInQueue, price, description } = req.body;

  const sliderImages = req.files["sliderImages"]?.map(file => file.filename) || [];
  const clientAvatar = req.files["clientAvatar"]?.[0]?.filename || "";
  const documents = req.files["documents"]?.map(file => ({
    name: file.originalname,
    file: file.filename
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
    documents
  });

  await newItem.save();
  res.redirect("/category-details");
};

const updateCategory = async (req, res) => {
  const updates = { ...req.body };

  if (req.files["sliderImages"])
    updates.sliderImages = req.files["sliderImages"].map(file => file.filename);

  if (req.files["clientAvatar"])
    updates.clientAvatar = req.files["clientAvatar"][0].filename;

  if (req.files["documents"])
    updates.documents = req.files["documents"].map(file => ({
      name: file.originalname,
      file: file.filename
    }));

  await CategoryDetail.findByIdAndUpdate(req.params.id, updates);
  res.redirect("/category-details");
};

const deleteCategory = async (req, res) => {
  await CategoryDetail.findByIdAndDelete(req.params.id);
  res.redirect("/category-details");
};

module.exports = {
    getAllCategory, 
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory,

};
