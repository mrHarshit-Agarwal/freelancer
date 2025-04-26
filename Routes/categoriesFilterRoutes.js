const express = require('express');
const router = express.Router();
const categoryFilterController = require('../controllers/admin/categoriesFilterController');
const upload = require('../middleware/multer');

router.post('/categoryfilter', upload.single('image'), categoryFilterController.createCategory);
router.get('/categoryfilter', categoryFilterController.getAllCategories);
router.get('/categoryfilter/:id', categoryFilterController.getCategoryById);
router.put('/categoryfilter/:id', upload.single('image'), categoryFilterController.updateCategory);
router.delete('/categoryfilter/:id', categoryFilterController.deleteCategory);

module.exports = router;
