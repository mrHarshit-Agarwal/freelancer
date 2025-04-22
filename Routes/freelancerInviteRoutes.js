const express = require("express");
const router = express.Router();
const freelancerInviteController = require("../controllers/admin/freelancerInviteController");

router.post("/freelancerinvite", freelancerInviteController.createFreelancer);
router.get("/freelancerinvite", freelancerInviteController.getAllFreelancers);
router.get("/freelancerinvite/:id", freelancerInviteController.getFreelancerById);
router.put("/freelancerinvite/:id", freelancerInviteController.updateFreelancer);
router.delete("/freelancerinvite/:id", freelancerInviteController.deleteFreelancer);

module.exports = router;
