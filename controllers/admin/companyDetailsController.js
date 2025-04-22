const Company = require('../../models/companyDetailsModel');


const getAllCompanies = async (req, res) => {
  const companies = await Company.find();

  res.render('companydetail', { companies });
};

const showCreateForm = (req, res) => {
  res.render('companydetail-form', { 
    company: {},
    formAction: '/companydetail' });
};


const createCompany = async (req, res) => {
  const { 
    name,
    email,
    address,
    phone, 
    description,
    website,
    status
  } = req.body;
  await Company.create({
    name,
    email,
    address,
    phone,
    description,
    website,
    status
  });
  res.redirect('/companydetail');
};

const showEditForm = async (req, res) => {
  const company = await Company.findById(req.params.id);
  res.render('companydetail-form', {
    company,
    formAction: `/companydetail/${req.params.id}`
  });
};

const updateCompany = async (req, res) => {
  const { name,
    email,
    address,
    phone,
    description,
    website,
    status 
  } = req.body;
  await Company.findByIdAndUpdate(req.params.id, {
    name,
    email,
    address,
    phone,
    description,
    website,
    status
  });
  res.redirect('/companydetail');
};

const deleteCompany = async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.redirect('/companydetail');
};

module.exports = {
  getAllCompanies,
  showCreateForm,
  createCompany,
  showEditForm,
  updateCompany,
  deleteCompany,
};