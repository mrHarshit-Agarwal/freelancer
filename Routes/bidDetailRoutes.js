const express = require("express");
const router = express.Router();
const bidDetailController = require("../controllers/admin/bidDetailController");
const upload = require("../middleware/multer");

router.post("/biddetail", upload.single("image"), bidDetailController.createBidDetail);
router.get("/biddetail", bidDetailController.getAllBidDetails);
router.get("/biddetail/:id", bidDetailController.getBidDetailById);
router.put("/biddetail/:id", upload.single("image"), bidDetailController.updateBidDetail);
router.delete("/biddetail/:id", bidDetailController.deleteBidDetail);

module.exports = router;
