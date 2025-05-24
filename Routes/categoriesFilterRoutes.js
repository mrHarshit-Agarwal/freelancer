const express = require('express');
const router = express.Router();
const categoryFilterController = require('../controllers/admin/categoriesFilterController');
const dynamicStorage = require('../middleware/multer');

const upload = dynamicStorage('categoryFilterImages');

const uploadFields = upload.fields([
  { name: 'clientImage', maxCount: 1 },
  { name: 'categoryImage', maxCount: 1 }
]);

router.post('/categoryfilter', uploadFields, categoryFilterController.createCategory);
router.get('/categoryfilter', categoryFilterController.getAllCategories);
router.get('/categoryfilter/:slug', categoryFilterController.getCategoryBySlug);
router.put('/categoryfilter/:slug', uploadFields, categoryFilterController.updateCategory);
router.delete('/categoryfilter/:slug', categoryFilterController.deleteCategory);

module.exports = router;
