const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/admin/aboutController');
const dynamicStorage = require('../middleware/multer');


const upload = dynamicStorage('aboutImages');

router.post("/about", upload.single("images"), aboutController.createAbout);
router.get("/about", aboutController.getAllAbout);
router.get("/about/:slug", aboutController.getAboutBySlug);
router.put("/about/:slug", upload.single("images"), aboutController.updateAbout);
router.delete("/about/:slug", aboutController.deleteAbout);

module.exports = router;
