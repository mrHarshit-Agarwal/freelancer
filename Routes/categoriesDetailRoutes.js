const express = require("express");
const router = express.Router();
const categoryDetailController = require("../controllers/admin/categoriesDetailController");
const dynamicStorage = require("../middleware/multer");


const upload = dynamicStorage("categoryDetailImages");

const uploadFields = upload.fields([
  { name: "sliderImages", maxCount: 10 },
  { name: "clientAvatar", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

router.get("/categorydetail", categoryDetailController.getAllCategory);
router.get("/categorydetail/:slug", categoryDetailController.getOneCategory);
router.post("/categorydetail", uploadFields, categoryDetailController.createCategory);
router.put("/categorydetail/:slug", uploadFields, categoryDetailController.updateCategory);
router.delete("/categorydetail/:slug", categoryDetailController.deleteCategory);

module.exports = router;
