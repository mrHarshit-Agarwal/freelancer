const Freelancer = require("../../models/freelancerModel");
const fs = require("fs");
const path = require("path");

const createFreelancer = async (req, res) => {
  try {
    const {
      name, role, description, skills, rating, hourlyRate,
      location, totalReviews, status
    } = req.body;

    const profileImage = req.file ? req.file.filename : null;

    const newFreelancer = new Freelancer({
      name,
      role,
      description,
      profileImage,
      skills,
      rating,
      hourlyRate,
      location,
      totalReviews,
      status,
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

const getFreelancerBySlug = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ slug: req.params.slug });
    if (!freelancer) {
      return res.status(404).json({ success: false, message: "Freelancer not found" });
    }
    res.status(200).json({ success: true, data: freelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const updateFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ slug: req.params.slug });
    if (!freelancer) {
      return res.status(404).json({ success: false, message: "Freelancer not found" });
    }

    const updates = req.body;

    if (updates.name) {
      freelancer.name = updates.name;
      freelancer.slug = slugify(updates.name + "-" + Date.now(), { lower: true, strict: true });
    }

    if (req.file) {
      if (freelancer.profileImage) {
        const oldImagePath = path.join("uploads/freelancer", freelancer.profileImage);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      freelancer.profileImage = req.file.filename;
    }

    Object.assign(freelancer, updates);
    await freelancer.save();

    res.status(200).json({ success: true, message: "Freelancer updated", data: freelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const deleteFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOneAndDelete({ slug: req.params.slug });
    if (!freelancer) {
      return res.status(404).json({ success: false, message: "Freelancer not found" });
    }

    if (freelancer.profileImage) {
      const imagePath = path.join("uploads/freelancer", freelancer.profileImage);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.status(200).json({ success: true, message: "Freelancer deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createFreelancer,
  getAllFreelancers,
  getFreelancerBySlug,
  updateFreelancer,
  deleteFreelancer,
};
