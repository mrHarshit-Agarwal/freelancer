const express = require('express');
const router = express.Router();
const blogDetailController = require('../controllers/admin/blogDetailController');
const upload = require('../middleware/multer');

router.post('/blogdetail', upload.array('image'), blogDetailController.createBlogDetail);
router.get('/blogdetail', blogDetailController.getAllBlogDetails);
router.get('/blogdetail/:id', blogDetailController.getBlogDetailById);
router.put('/blogdetail/:id', upload.array('image'), blogDetailController.updateBlogDetail);
router.delete('/blogdetail/:id', blogDetailController.deleteBlogDetail);

module.exports = router;
