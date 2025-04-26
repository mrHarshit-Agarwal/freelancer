const express = require("express");
const router = express.Router();
const categoryDetailController = require("../controllers/admin/categoriesDetailController");
const upload = require("../middleware/multer");

const uploadFields = upload.fields([
  { name: 'sliderImages', maxCount: 10 },
  { name: 'clientAvatar', maxCount: 1 },
  { name: 'documents', maxCount: 10 }
]);


router.get("/categorydetail", categoryDetailController.getAllCategory);
router.get("/categorydetail/:id", categoryDetailController.getOneCategory);
router.post("/categorydetail", uploadFields, categoryDetailController.createCategory);
router.put("/categorydetail/:id", uploadFields, categoryDetailController.updateCategory);
router.delete("/categorydetail/:id", categoryDetailController.deleteCategory);

module.exports = router;
