const About = require('../../models/aboutModel');
const fs = require('fs');

const createAbout = async (req, res) => {
  try {
    const {
      aboutTitle, aboutDescription, whatWeDoTitle,
      whatWeDoDescription, weDoDifferentlyTitle,
      totalFreelancers, positiveReviews,
      projectsCompleted, satisfiedUsers,
      testimonial
    } = req.body;

    const images = req.files?.map(file => file.filename) || [];

    const newAbout = new About({
      aboutTitle,
      aboutDescription,
      whatWeDoTitle,
      whatWeDoDescription,
      weDoDifferentlyTitle,
      totalFreelancers,
      positiveReviews,
      projectsCompleted,
      satisfiedUsers,
      testimonial: testimonial ? JSON.parse(testimonial) : [],
      images
    });

    const saved = await newAbout.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllAbout = async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json({ success: true, data: about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ success: false, message: "About section not found" });
    res.status(200).json({ success: true, data: about });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const updatedFields = { ...req.body };

    if (req.body.testimonial) {
      updatedFields.testimonial = JSON.parse(req.body.testimonial);
    }

    if (req.files?.length) {
      updatedFields.images = req.files.map(file => file.filename);
    }

    const updated = await About.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const deleted = await About.findByIdAndDelete(req.params.id);
    if (deleted?.images) {
      deleted.images.forEach(img => {
        const imgPath = `uploads/${img}`;
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }
    res.status(200).json({ success: true, message: "About section deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {
    createAbout,
    getAllAbout,
    getAboutById,
    updateAbout,
    deleteAbout,
  };
  