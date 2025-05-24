const express = require("express");
const router = express.Router();
const companyController = require("../controllers/admin/companyController");

router.get("/company", companyController.getAllCompanies);
router.post("/company", companyController.createCompany);
router.get("/company/:slug", companyController.getCompanyBySlug);
router.put("/company/:slug", companyController.updateCompany);
router.delete("/company/:slug", companyController.deleteCompany);
module.exports = router;
