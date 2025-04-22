const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/admin/blogController');


router.post('/blog', upload.array('image'), createBlog);
router.get('/blog', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', upload.array('image'), updateBlog);
router.delete('/blog/:id', deleteBlog);

module.exports = router;
