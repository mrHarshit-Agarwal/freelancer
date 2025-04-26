const express = require("express");
const router = express.Router();
const bidController = require("../controllers/admin/bidController");
const upload = require("../middleware/multer");



router.post("/bid", upload.single("image"), bidController.createBid);
router.get("/bid", bidController.getAllbids);
router.get("/bid/:id", bidController.getBidById);
router.put("/bid/:id", upload.single("image"), bidController.updateBid);
router.delete("/bid/:id", bidController.deleteBid);

module.exports = router;
