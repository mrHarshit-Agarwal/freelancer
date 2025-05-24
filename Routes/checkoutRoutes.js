const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/admin/checkoutController');

router.post("/checkout", checkoutController.createCheckout);
router.get("/checkout", checkoutController.getAllCheckouts);
router.get("/checkout/:slug", checkoutController.getCheckoutBySlug);
router.put("/checkout/:slug", checkoutController.updateCheckout);
router.delete("/checkout/:slug", checkoutController.deleteCheckout);

module.exports = router;
