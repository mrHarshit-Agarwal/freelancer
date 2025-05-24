const FreelancerDetail = require("../../models/freelanceDetailsModel");



exports.createFreelancer = async (req, res) => {
  try {
    const data = req.body;

    
    if (req.file) {
      data.profileImage = req.file.filename;
    }

    const freelancer = new FreelancerDetail(data);
    await freelancer.save();

    res.status(201).json({ success: true, freelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await FreelancerDetail.find();
    res.status(200).json({ success: true, freelancers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getFreelancerBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const freelancer = await FreelancerDetail.findOne({ slug });

    if (!freelancer) {
      return res.status(404).json({ success: false, message: 'Freelancer not found' });
    }

    res.status(200).json({ success: true, freelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.updateFreelancer = async (req, res) => {
  try {
    const slug = req.params.slug;
    const data = req.body;

    if (req.file) {
      data.profileImage = req.file.filename;
    }

    const freelancer = await FreelancerDetail.findOneAndUpdate({ slug }, data, { new: true, runValidators: true });

    if (!freelancer) {
      return res.status(404).json({ success: false, message: 'Freelancer not found' });
    }

    res.status(200).json({ success: true, freelancer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.deleteFreelancer = async (req, res) => {
  try {
    const slug = req.params.slug;
    const freelancer = await FreelancerDetail.findOneAndDelete({ slug });

    if (!freelancer) {
      return res.status(404).json({ success: false, message: 'Freelancer not found' });
    }

    res.status(200).json({ success: true, message: 'Freelancer deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
