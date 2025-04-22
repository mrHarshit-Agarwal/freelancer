const express = require('express');
const router = express.Router();
const companyDetailController = require('../controllers/admin/companyDetailsController');

router.get("/companydetail", (req, res) => {
    res.render("fonts/companyDetails", { title: "Company Details" });
});


router.get('/companydetail', companyDetailController.getAllCompanies);
router.get('/companydetail/create', companyDetailController.showCreateForm);
router.post('/companydetail', companyDetailController.createCompany);
router.get('/companydetail/:id/edit', companyDetailController.showEditForm);
router.post('/companydetail/:id', companyDetailController.updateCompany);
router.post('/companydetail/:id/delete', companyDetailController.deleteCompany);

module.exports = router;
