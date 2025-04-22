const FreelancerInvite = require("../../models/freelancerInviteModel");

const createFreelancer = async (req, res) => {
  const {
    name, hourlyRate, joinDate, recommendations, verifications, skills, certifications,
    categories, rating, jobCompleted, hireRate, onTime, onBudget, about, portfolio, reviews,
  } = req.body;

  if (!name || !hourlyRate || !joinDate || !about) {
    return res.status(400).json({
      message: "Please fill in all required fields",
    });
  }

  try {
    const freelancer = await Freelancer.create({
      name,
      hourlyRate,
      joinDate,
      recommendations,
      verifications,
      skills,
      certifications,
      categories,
      rating,
      jobCompleted,
      hireRate,
      onTime,
      onBudget,
      about,
      portfolio,
      reviews,
    });

    res.status(201).json({
      message: "Freelancer invite created successfully",
      freelancer,
    });
  } catch (err) {
    console.error("Create freelancer invite error:", err);
    res.status(500).json({
      message: "Server error while creating freelancer invite",
    });
  }
};

const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find().sort({ createdAt: -1 });
    res.status(200).json({ freelancers });
  } catch (err) {
    console.error("Fetch freelancer invites error:", err);
    res.status(500).json({
      message: "Error fetching freelancer invites",
    });
  }
};

const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);

    if (!freelancer) {
      return res.status(404).json({
        message: "Invite not found",
      });
    }

    res.status(200).json({ freelancer });
  } catch (err) {
    console.error("Get freelancer invite error:", err);
    res.status(500).json({
      message: "Error fetching freelancer invite",
    });
  }
};

const updateFreelancer = async (req, res) => {
  try {
    const { 
      name, hourlyRate, joinDate, recommendations, verifications, skills, certifications,
      categories, rating, jobCompleted, hireRate, onTime, onBudget, about, portfolio, reviews,
     } = req.body;

    const freelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      {
        name,
        hourlyRate,
        joinDate,
        recommendations,
        verifications,
        skills,
        certifications,
        categories,
        rating,
        jobCompleted,
        hireRate,
        onTime,
        onBudget,
        about,
        portfolio,
        reviews,
      },
      { new: true }
    );

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer Invite not found" });
    }

    res.status(200).json({
      message: "Freelancer Invite updated",
      freelancer,
    });
  } catch (err) {
    console.error("Update freelancer invite error:", err);
    res.status(500).json({ message: "Error updating freelancer invite" });
  }
};

const deleteFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndDelete(req.params.id);

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer Invite not found" });
    }

    res.status(200).json({ message: "Freelancer Invite deleted" });
  } catch (err) {
    console.error("Delete freelancer invite error:", err);
    res.status(500).json({ message: "Error deleting freelancer invite" });
  }
};

module.exports = {
  createFreelancer,
  getAllFreelancers,
  getFreelancerById,
  updateFreelancer,
  deleteFreelancer,
};
