const express = require("express");
const multer = require("../middleware/multer");
const router = express.Router();

// ✅ Call the multer function with the desired folder name
const upload = multer("freelancer");

router.post("/upload-profile-image", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Profile image uploaded successfully",
    imagePath: req.file.path,
  });
});

module.exports = router;
