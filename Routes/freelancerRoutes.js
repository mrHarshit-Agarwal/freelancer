const express = require('express');
const router = express.Router();
const dynamicStorage = require("../middleware/multer");
const controller = require('../controllers/admin/freelancerController');

const upload = dynamicStorage("freelancerImages");

// Routes
router.post("/freelancers", upload.single("profileImage"), controller.createFreelancer);
router.get("/freelancers", controller.getAllFreelancers);
router.get("/freelancers/:slug", controller.getFreelancerBySlug);
router.put("/freelancers/:slug", upload.single("profileImage"), controller.updateFreelancer);
router.delete("/freelancers/:slug", controller.deleteFreelancer);

module.exports = router;

