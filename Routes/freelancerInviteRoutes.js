const express = require("express");
const router = express.Router();
const freelancerInviteController = require("../controllers/admin/freelancerInviteController");

router.post("/freelancerinvite", freelancerInviteController.createFreelancer);
router.get("/freelancerinvite", freelancerInviteController.getAllFreelancers);
router.get("/freelancerinvite/:slug", freelancerInviteController.getFreelancerBySlug);
router.put("/freelancerinvite/:slug", freelancerInviteController.updateFreelancer);
router.delete("/freelancerinvite/:slug", freelancerInviteController.deleteFreelancer);


module.exports = router;
