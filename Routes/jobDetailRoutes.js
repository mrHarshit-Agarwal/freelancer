const express = require('express');
const router = express.Router();
const dynamicStorage = require('../middleware/multer');
const controller = require('../controllers/admin/jobDetailController');

const upload = dynamicStorage('jobDetails');

router.post('/job-details', upload.fields([
  { name: 'companyImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]), controller.createJobDetail);

router.get('/job-details', controller.getAllJobDetails);
router.get('/job-details/:slug', controller.getJobDetailBySlug);

router.put('/job-details/:slug', upload.fields([
  { name: 'companyImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]), controller.updateJobDetailBySlug);

router.delete('/job-details/:slug', controller.deleteJobDetailBySlug);

module.exports = router;
