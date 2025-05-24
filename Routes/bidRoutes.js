const express = require("express");
const router = express.Router();
const bidController = require("../controllers/admin/bidController");
const dynamicStorage = require("../middleware/multer");

const upload = dynamicStorage("bidImages");


router.post("/bid", upload.single("image"), bidController.createBid);
router.get("/bid", bidController.getAllBids);
router.get("/bid/:slug", bidController.getBidBySlug);
router.put("/bid/:slug", upload.single("image"), bidController.updateBidBySlug);
router.delete("/bid/:slug", bidController.deleteBidBySlug);

module.exports = router;
