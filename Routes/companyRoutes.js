const express = require("express");
const router = express.Router();
const companyController = require("../controllers/admin/companyController");

router.get("/company", (req, res) => {
    res.render("fonts/companies", { title: "Company Page" });
});

router.post("/company", companyController.createCompany);
router.get("/company", companyController.getAllCompanies);
router.get("/company/:id", companyController.getCompanyById);
router.put("/company/:id", companyController.updateCompany);
router.delete("/company/:id", companyController.deleteCompany);

module.exports = router;
