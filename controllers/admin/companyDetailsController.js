const Company = require('../../models/companyDetailsModel');

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.render("companydetail", { companies });
  } catch (err) {
    res.status(500).send("Error fetching companies");
  }
};

const showCreateForm = (req, res) => {
  res.render("companydetail-form", {
    company: {},
    formAction: "/companydetail"
  });
};

const createCompany = async (req, res) => {
  try {
    const { name, email, address, phone, description, website, status } = req.body;
    await Company.create({ name, email, address, phone, description, website, status });
    res.redirect("/companydetail");
  } catch (err) {
    res.status(500).send("Error creating company");
  }
};

const showEditForm = async (req, res) => {
  try {
    const company = await Company.findOne({ slug: req.params.slug });
    if (!company) return res.redirect("/companydetail");

    res.render("companydetail-form", {
      company,
      formAction: `/companydetail/${company.slug}`
    });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};


const updateCompany = async (req, res) => {
  try {
    const { name, email, address, phone, description, website, status } = req.body;
    const company = await Company.findOne({ slug: req.params.slug });

    if (!company) return res.redirect("/companydetail");

    company.name = name;
    company.email = email;
    company.address = address;
    company.phone = phone;
    company.description = description;
    company.website = website;
    company.status = status;

    await company.save();
    res.redirect("/companydetail");
  } catch (err) {
    res.status(500).send("Error updating company");
  }
};

const deleteCompany = async (req, res) => {
  try {
    await Company.findOneAndDelete({ slug: req.params.slug });
    res.redirect("/companydetail");
  } catch (err) {
    res.status(500).send("Error deleting company");
  }
};

module.exports = {
  getAllCompanies,
  showCreateForm,
  createCompany,
  showEditForm,
  updateCompany,
  deleteCompany
};
