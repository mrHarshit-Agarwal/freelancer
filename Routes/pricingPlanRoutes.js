const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin/pricingPlanController');

router.post('/pricing-plans', controller.createPricingPlan);
router.get('/pricing-plans', controller.getAllPlans);
router.get('/pricing-plans/:slug', controller.getPlanBySlug);
router.put('/pricing-plans/:slug', controller.updatePlanBySlug);
router.delete('/pricing-plans/:slug', controller.deletePlanBySlug);

module.exports = router;

