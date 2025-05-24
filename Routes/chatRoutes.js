const express = require("express");
const router = express.Router();
const chatController = require("../controllers/admin/chatController");
const dynamicStorage = require("../middleware/multer");
const upload = dynamicStorage("chatImages");

router.post("/chat", upload.single("image"), chatController.createChat);
router.get("/chat", chatController.getAllChats);
router.get("/chat/:slug", chatController.getChatBySlug);
router.put("/chat/:slug", upload.single("image"), chatController.updateChat);
router.delete("/chat/:slug", chatController.deleteChat);

module.exports = router;
