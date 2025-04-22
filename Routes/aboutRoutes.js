const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/admin/aboutController');
const upload = require('../middleware/multer');

router.post('/about', upload.array('images'), aboutController.createAbout);
router.get('/about', aboutController.getAllAbout);
router.get('/about/:id', aboutController.getAboutById);
router.put('/about/:id', upload.array('images'), aboutController.updateAbout);
router.delete('/about/:id', aboutController.deleteAbout);

module.exports = router;
