const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin/freelanceDetailsController");
const dynamicStorage = require("../middleware/multer");
const upload = dynamicStorage("freelancerImages");

router.post("/freelancerdetail", upload.single("image"), controller.createFreelancer);
router.get("/freelancerdetail", controller.getAllFreelancers);
router.get("/freelancerdetail/:slug", controller.getFreelancerBySlug);
router.put("/freelancerdetail/:slug", upload.single("image"), controller.updateFreelancer);
router.delete("/freelancerdetail/:slug", controller.deleteFreelancer);

module.exports = router;
