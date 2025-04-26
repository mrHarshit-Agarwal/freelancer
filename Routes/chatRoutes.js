const express = require("express");
const router = express.Router();
const chatController = require("../controllers/admin/chatController");
const upload = require("../middleware/multer");

router.post("/chat", upload.single("image"), chatController.createChat);
router.get("/chat", chatController.getAllChats);
router.get("/chat/:id", chatController.getChatById);
router.put("/chat/:id", upload.single("image"), chatController.updateChat);
router.delete("/chat/:id", chatController.deleteChat);

module.exports = router;
