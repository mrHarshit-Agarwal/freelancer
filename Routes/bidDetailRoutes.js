const express = require("express");
const router = express.Router();
const bidDetailController = require("../controllers/admin/bidDetailController");
const dynamicStorage = require("../middleware/multer");

const upload = dynamicStorage("bidImages");


router.post("/bid-detail", upload.single("image"), bidDetailController.createBidDetail);
router.get("/bid-detail", bidDetailController.getAllBidDetails);
router.get("/bid-detail/:slug", bidDetailController.getBidDetailBySlug);
router.put("/bid-detail/:slug", upload.single("image"), bidDetailController.updateBidDetailBySlug);
router.delete("/bid-detail/:slug", bidDetailController.deleteBidDetailBySlug);

module.exports = router;
