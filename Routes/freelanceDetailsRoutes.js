const express = require("express");
const router = express.Router();
const freelancerDetailController = require("../controllers/admin/freelanceDetailsController");
const upload = require("../middleware/multer");


router.post("/freelancerdetail", upload.single("image"), freelancerDetailController.createFreelancer);
router.get("/freelancerdetail", freelancerDetailController.getAllFreelancers);
router.get("/freelancerdetail/:id", freelancerDetailController.getFreelancerById);
router.put("/freelancerdetail/:id", upload.single("image"), freelancerDetailController.updateFreelancer);
router.delete("/freelancerdetail/:id/delete", freelancerDetailController.deleteFreelancer);

module.exports = router;
