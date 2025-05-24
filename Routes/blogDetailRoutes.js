const express = require('express');
const router = express.Router();
const blogDetailController = require('../controllers/admin/blogDetailController');
const dynamicStorage = require('../middleware/multer');

const upload = dynamicStorage('blogDetailImages');

router.post("/blogdetail", upload.single("image"), blogDetailController.createBlogDetail);
router.get("/blogdetail", blogDetailController.getAllBlogDetails);
router.get("/blogdetail/:slug", blogDetailController.getBlogDetailBySlug);
router.put("/blogdetail/:slug", upload.single("image"), blogDetailController.updateBlogDetail);
router.delete("/blogdetail/:slug", blogDetailController.deleteBlogDetail);

module.exports = router;
