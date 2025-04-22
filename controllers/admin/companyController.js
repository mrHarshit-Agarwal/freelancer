const Company = require("../../models/companyModel");

const createCompany = async (req, res) => {
  const { name, address, logoUrl, socialLinks } = req.body;

  if (!name || !address || !logoUrl) {
    return res.status(400).json({
      message: "Enter required fields",
    });
  }

  try {
    const company = await Company.create({
      name,
      address,
      logoUrl,
      socialLinks,
    });

    res.status(201).json({ message: "Company created successfully", company });
  } catch (err) {
    console.error("Create company error:", err);
    res.status(500).json({
      message: "Server error while creating company",
    });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.render("fonts/companies", { companies });
  } catch (err) {
    console.error("Fetch companies error:", err);
    res.status(500).json({
      message: "Error fetching companies",
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company)
      return res.status(404).json({
        message: "Company not found",
      });

    res.status(200).json({ company });
  } catch (err) {
    console.error("Get company error:", err);
    res.status(500).json({
      message: "Error fetching company",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, address, logoUrl, socialLinks } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
        logoUrl,
        socialLinks,
      },
      { new: true }
    );

    if (!company)
      return res.status(404).json({
        message: "Company not found",
      });

    res.status(200).json({
      message: "Company updated",
      company,
    });
  } catch (err) {
    console.error("Update company error:", err);
    res.status(500).json({ message: "Error updating company" });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company deleted" });
  } catch (err) {
    console.error("Delete company error:", err);
    res.status(500).json({ message: "Error deleting company" });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
