const About = require('../../models/aboutModel');
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

const createAbout = async (req, res) => {
  try {
    const {
      aboutTitle,
      aboutDescription,
      whatWeDoTitle,
      whatWeDoDescription,
      weDoDifferentlyTitle,
      totalFreelancers,
      positiveReviews,
      projectsCompleted,
      satisfiedUsers,
      testimonial,
    } = req.body;

    const image = req.file?.filename;

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
      images: image ? [image] : [],
    });

    await newAbout.save();
    res.status(201).json(newAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAbout = async (req, res) => {
  try {
    const data = await About.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAboutBySlug = async (req, res) => {
  try {
    const about = await About.findOne({ slug: req.params.id });
    if (!about) return res.status(404).json({ error: "About not found" });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const about = await About.findOne({ slug: req.params.id });
    if (!about) return res.status(404).json({ error: "About not found" });

    const {
      aboutTitle,
      aboutDescription,
      whatWeDoTitle,
      whatWeDoDescription,
      weDoDifferentlyTitle,
      totalFreelancers,
      positiveReviews,
      projectsCompleted,
      satisfiedUsers,
      testimonial,
    } = req.body;

    if (aboutTitle) {
      about.aboutTitle = aboutTitle;
      about.slug = slugify(aboutTitle, { lower: true, strict: true });
    }

    if (aboutDescription) about.aboutDescription = aboutDescription;
    if (whatWeDoTitle) about.whatWeDoTitle = whatWeDoTitle;
    if (whatWeDoDescription) about.whatWeDoDescription = whatWeDoDescription;
    if (weDoDifferentlyTitle) about.weDoDifferentlyTitle = weDoDifferentlyTitle;
    if (totalFreelancers) about.totalFreelancers = totalFreelancers;
    if (positiveReviews) about.positiveReviews = positiveReviews;
    if (projectsCompleted) about.projectsCompleted = projectsCompleted;
    if (satisfiedUsers) about.satisfiedUsers = satisfiedUsers;
    if (testimonial) about.testimonial = JSON.parse(testimonial);

    if (req.file) {
      // Delete old image if exists
      if (about.images.length) {
        const oldImagePath = path.join("uploads/about", about.images[0]);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      about.images = [req.file.filename];
    }

    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const about = await About.findOneAndDelete({ slug: req.params.id });
    if (!about) return res.status(404).json({ error: "About not found" });

    if (about.images.length) {
      const oldImagePath = path.join("uploads/about", about.images[0]);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    res.json({ message: "About section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
    createAbout,
    getAllAbout,
    getAboutBySlug,
    updateAbout,
    deleteAbout,
  };
  