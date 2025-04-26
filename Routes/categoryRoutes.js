const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/admin/categoryController');
const upload = require('../middleware/multer');

router.post('/category', upload.single('image'), categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;
