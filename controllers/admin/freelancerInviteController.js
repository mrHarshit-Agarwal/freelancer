const FreelancerInvite = require("../../models/freelancerInviteModel");

const createFreelancer = async (req, res) => {
  const {
    name, hourlyRate, joinDate, recommendations, verifications, skills, certifications,
    categories, rating, jobCompleted, hireRate, onTime, onBudget, about, portfolio, reviews
  } = req.body;

  if (!name || !hourlyRate || !joinDate || !about) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  try {
    const freelancer = await Freelancer.create({
      name, hourlyRate, joinDate, recommendations, verifications, skills, certifications,
      categories, rating, jobCompleted, hireRate, onTime, onBudget, about, portfolio, reviews
    });

    res.status(201).json({ message: "Freelancer invite created", freelancer });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Server error creating freelancer invite" });
  }
};


const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find().sort({ createdAt: -1 });
    res.status(200).json({ freelancers });
  } catch (err) {
    res.status(500).json({ message: "Error fetching freelancer invites" });
  }
};

const getFreelancerBySlug = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ slug: req.params.slug });
    if (!freelancer) return res.status(404).json({ message: "Freelancer invite not found" });

    res.status(200).json({ freelancer });
  } catch (err) {
    res.status(500).json({ message: "Error fetching freelancer invite" });
  }
};

const updateFreelancer = async (req, res) => {
  try {
    const updates = req.body;
    const freelancer = await Freelancer.findOne({ slug: req.params.slug });

    if (!freelancer) return res.status(404).json({ message: "Freelancer invite not found" });

    if (updates.name) {
      freelancer.name = updates.name;
      freelancer.slug = slugify(updates.name + "-" + Date.now(), { lower: true, strict: true });
    }

    Object.assign(freelancer, updates);
    await freelancer.save();

    res.status(200).json({ message: "Freelancer invite updated", freelancer });
  } catch (err) {
    res.status(500).json({ message: "Error updating freelancer invite" });
  }
};

const deleteFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOneAndDelete({ slug: req.params.slug });

    if (!freelancer) return res.status(404).json({ message: "Freelancer invite not found" });

    res.status(200).json({ message: "Freelancer invite deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting freelancer invite" });
  }
};

module.exports = {
  createFreelancer,
  getAllFreelancers,
  getFreelancerBySlug,
  updateFreelancer,
  deleteFreelancer,
};