const JobDetail = require('../../models/jobDetailModel');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const createJobDetail = async (req, res) => {
  try {
    const {
      companyName, companyLocation, companyEmail, companyEmployees, skills, services, jobTitle, jobDescription,experience, salary,
      jobType, address, city, state, mapUrl, additionalEmail, phone
    } = req.body;

    const slug = slugify(`${companyName}-${jobTitle}`, { lower: true });

    const jobDetail = new JobDetail({
      companyName,
      companyLocation,
      companyEmail,
      companyEmployees,
      skills: skills ? skills.split(',') : [],
      services: services ? services.split(',') : [],
      jobTitle,
      jobDescription,
      experience,
      salary,
      jobType,
      address,
      city,
      state,
      mapUrl,
      additionalEmail,
      phone,
      slug,
    });

    if (req.files) {
      if (req.files['companyImage']) {
        jobDetail.companyImage = req.files['companyImage'][0].filename;
      }
      if (req.files['backgroundImage']) {
        jobDetail.backgroundImage = req.files['backgroundImage'][0].filename;
      }
    }

    await jobDetail.save();
    res.status(201).json({ message: 'Job Detail created successfully', data: jobDetail });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job detail', error: error.message });
  }
};
const getAllJobDetails = async (req, res) => {
  try {
    const jobs = await JobDetail.find();
    res.status(200).json({ data: jobs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details', error: error.message });
  }
};

const getJobDetailBySlug = async (req, res) => {
  try {
    const job = await JobDetail.findOne({ slug: req.params.slug });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ data: job });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job detail', error: error.message });
  }
};

const updateJobDetailBySlug = async (req, res) => {
  try {
    const job = await JobDetail.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const {
        
      companyName, companyLocation, companyEmail, companyEmployees, skills, services, jobTitle, jobDescription,experience, salary,
      jobType, address, city, state, mapUrl, additionalEmail, phone
    } = req.body;

    job.companyName = companyName || job.companyName;
    job.companyLocation = companyLocation || job.companyLocation;
    job.companyEmail = companyEmail || job.companyEmail;
    job.companyEmployees = companyEmployees || job.companyEmployees;
    job.skills = skills ? skills.split(',') : job.skills;
    job.services = services ? services.split(',') : job.services;
    job.jobTitle = jobTitle || job.jobTitle;
    job.jobDescription = jobDescription || job.jobDescription;
    job.experience = experience || job.experience;
    job.salary = salary || job.salary;
    job.jobType = jobType || job.jobType;
    job.address = address || job.address;
    job.city = city || job.city;
    job.state = state || job.state;
    job.mapUrl = mapUrl || job.mapUrl;
    job.additionalEmail = additionalEmail || job.additionalEmail;
    job.phone = phone || job.phone;

    // Update slug
    job.slug = slugify(`${job.companyName}-${job.jobTitle}`, { lower: true });

    if (req.files) {
      if (req.files['companyImage']) {
        if (job.companyImage) {
          fs.unlinkSync(path.join('uploads/jobDetails/', job.companyImage));
        }
        job.companyImage = req.files['companyImage'][0].filename;
      }
      if (req.files['backgroundImage']) {
        if (job.backgroundImage) {
          fs.unlinkSync(path.join('uploads/jobDetails/', job.backgroundImage));
        }
        job.backgroundImage = req.files['backgroundImage'][0].filename;
      }
    }

    await job.save();
    res.status(200).json({ message: 'Job detail updated', data: job });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job detail', error: error.message });
  }
};

const deleteJobDetailBySlug = async (req, res) => {
  try {
    const job = await JobDetail.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.companyImage) {
      fs.unlinkSync(path.join('uploads/jobDetails/', job.companyImage));
    }
    if (job.backgroundImage) {
      fs.unlinkSync(path.join('uploads/jobDetails/', job.backgroundImage));
    }

    await job.deleteOne();
    res.status(200).json({ message: 'Job detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job detail', error: error.message });
  }
};


module.exports ={
    createJobDetail,
    deleteJobDetailBySlug,
    getAllJobDetails,
    getJobDetailBySlug,
    updateJobDetailBySlug
}