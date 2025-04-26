const express = require("express");
const router = express.Router();
const cartController = require("../controllers/admin/addCartController");
const upload = require("../middleware/multer");

router.post("/cart", upload.single("image"), cartController.addToCart);
router.get("/cart", cartController.getCart);
router.get("/cart/:id", cartController.getCartById);
router.put("/cart/:id", upload.single("image"), cartController.updateCart);
router.delete("/cart/:id", cartController.deleteCart);

module.exports = router;
