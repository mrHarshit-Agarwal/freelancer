const express = require("express");
const multer = require("../middleware/multer");
const router = express.Router();

router.post("/upload-profile-image", multer.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  
  const imagePath = req.file.path;

  res.json({
    message: "Profile image uploaded successfully",
    imagePath: imagePath,
  });
});

module.exports = router;
