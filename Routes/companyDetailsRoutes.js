const express = require('express');
const router = express.Router();
const companyDetailController = require('../controllers/admin/companyDetailsController');


router.get("/companydetail", companyDetailController.getAllCompanies);
router.get("/companydetail/create", companyDetailController.showCreateForm);
router.post("/companydetail", companyDetailController.createCompany);
router.get("/companydetail/:slug/edit", companyDetailController.showEditForm);
router.post("/companydetail/:slug", companyDetailController.updateCompany);
router.post("/companydetail/:slug/delete", companyDetailController.deleteCompany);

module.exports = router;
