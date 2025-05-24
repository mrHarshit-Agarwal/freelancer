const express = require('express');
const router = express.Router();
const blogController = require("../controllers/admin/blogController");
const dynamicStorage = require('../middleware/multer');

const upload = dynamicStorage('blogImages');

router.post("/blog", upload.single("image"), blogController.createBlog);
router.get("/blog", blogController.getAllBlogs);
router.get("/blog/:slug", blogController.getBlogBySlug);
router.put("/blog/:slug", upload.single("image"), blogController.updateBlogBySlug);
router.delete("/blog/:slug", blogController.deleteBlogBySlug);

module.exports = router;
