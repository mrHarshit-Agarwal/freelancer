const express = require("express");
const router = express.Router();
const cartController = require("../controllers/admin/addCartController");
const dynamicStorage = require("../middleware/multer");


const upload = dynamicStorage("cartImages");

router.post("/cart", upload.single("image"), cartController.createCartItem);
router.get("/cart", cartController.getAllCartItems);
router.get("/cart/:slug", cartController.getCartItemBySlug);
router.put("/cart/:slug", upload.single("image"), cartController.updateCartItemBySlug);
router.delete("/cart/:slug", cartController.deleteCartItemBySlug);

module.exports = router;
