const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/admin/sellerController');

router.post('/seller', sellerController.createSeller);
router.get('/seller', sellerController.getAllSellers);
router.get('/seller/:slug', sellerController.getSellerBySlug);
router.put('/seller/:slug', sellerController.updateSellerBySlug);
router.delete('/seller/:slug', sellerController.deleteSellerBySlug);

module.exports = router;
