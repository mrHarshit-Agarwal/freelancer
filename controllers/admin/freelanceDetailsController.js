const FreelancerDetail = require("../../models/freelanceDetailsModel");


const createFreelancer = async (req, res) => {
  try {
    const { name, email, address, phone, description, website, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const newFreelancer = new Freelancer({
      name,
      email,
      address,
      phone,
      description,
      website,
      status,
      image,
    });

    await newFreelancer.save();
    res.status(201).json({ success: true, message: "Freelancer created", data: newFreelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: freelancers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) return res.status(404).json({ success: false, message: "Freelancer not found" });

    res.status(200).json({ success: true, data: freelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const updateFreelancer = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) updates.image = req.file.filename;

    const updatedFreelancer = await Freelancer.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedFreelancer) return res.status(404).json({ success: false, message: "Freelancer not found" });

    res.status(200).json({ success: true, message: "Freelancer updated", data: updatedFreelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteFreelancer = async (req, res) => {
  try {
    const deleted = await Freelancer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Freelancer not found" });

    res.status(200).json({ success: true, message: "Freelancer deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createFreelancer,
  getAllFreelancers,
  getFreelancerById,
  updateFreelancer,
  deleteFreelancer,
};


