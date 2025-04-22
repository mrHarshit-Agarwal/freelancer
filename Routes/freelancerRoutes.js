const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const freelancerController = require('../controllers/admin/freelancerController');

router.post('/freelancer', multer.single('profileImage'), freelancerController.createFreelancer);
router.get('/freelancer', freelancerController.getAllFreelancers);
router.get('/freelancer/:id', freelancerController.getFreelancerById);
router.put('/freelancer/:id', multer.single('profileImage'), freelancerController.updateFreelancer);
router.delete('/freelancer/:id', freelancerController.deleteFreelancer);

module.exports = router;
