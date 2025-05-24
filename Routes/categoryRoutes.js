const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/admin/categoryController');
const dynamicStorage = require('../middleware/multer');
const upload = dynamicStorage('categoryImages');

router.post("/category", upload.single("image"), categoryController.createCategory);
router.get("/category", categoryController.getAllCategories);
router.get("/category/:slug", categoryController.getCategoryBySlug);
router.put("/category/:slug", upload.single("image"), categoryController.updateCategory);
router.delete("/category/:slug", categoryController.deleteCategory);

module.exports = router;
