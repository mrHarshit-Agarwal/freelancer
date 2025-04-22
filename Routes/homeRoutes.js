const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin/homeController');
const upload = require('../middleware/multer');
const { getAllHomeData } = require('../controllers/admin/homeController');

// Home API to fetch all data in a single response
router.get('/home', controller.getAllHomeData);

// HomeSlider
router.post("/slider", upload.single("image"), controller.createSlider);
router.get("/slider", controller.getSliders);
router.put("/slider/:id", upload.single("image"), controller.updateSlider);
router.delete("/slider/:id", controller.deleteSlider);

// SubSlider
router.post("/sub-slider", upload.single("image"), controller.createSubSlider);
router.get("/sub-slider", controller.getSubSliders);
router.put("/sub-slider/:id", upload.single("image"), controller.updateSubSlider);
router.delete("/sub-slider/:id", controller.deleteSubSlider);

// Category
router.post("/category", upload.single("image"), controller.createCategory);
router.get("/category", controller.getCategories);
router.put("/category/:id", upload.single("image"), controller.updateCategory);
router.delete("/category/:id", controller.deleteCategory);

// Service
router.post("/service", upload.single("image"), controller.createService);
router.get("/service", controller.getServices);
router.put("/service/:id", upload.single("image"), controller.updateService);
router.delete("/service/:id", controller.deleteService);

module.exports = router;
