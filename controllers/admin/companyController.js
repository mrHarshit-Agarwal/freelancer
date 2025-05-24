const Company = require("../../models/companyModel");

const createCompany = async (req, res) => {
  const { name, address, logoUrl, socialLinks } = req.body;

  if (!name || !address || !logoUrl) {
    return res.status(400).json({ message: "Enter required fields" });
  }

  try {
    const company = await Company.create({ name, address, logoUrl, socialLinks });
    res.status(201).json({ message: "Company created successfully", company });
  } catch (err) {
    console.error("Create company error:", err);
    res.status(500).json({ message: "Server error while creating company" });
  }
};


const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.render("fonts/companies", { companies });
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies" });
  }
};

const getCompanyBySlug = async (req, res) => {
  try {
    const company = await Company.findOne({ slug: req.params.slug });
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ company });
  } catch (err) {
    res.status(500).json({ message: "Error fetching company" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, address, logoUrl, socialLinks } = req.body;
    const company = await Company.findOne({ slug: req.params.slug });

    if (!company) return res.status(404).json({ message: "Company not found" });

    company.name = name || company.name;
    company.slug = name ? slugify(name, { lower: true, strict: true }) : company.slug;
    company.address = address || company.address;
    company.logoUrl = logoUrl || company.logoUrl;
    company.socialLinks = socialLinks || company.socialLinks;

    await company.save();

    res.status(200).json({ message: "Company updated", company });
  } catch (err) {
    res.status(500).json({ message: "Error updating company" });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({ slug: req.params.slug });
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting company" });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyBySlug,
  updateCompany,
  deleteCompany,
};
