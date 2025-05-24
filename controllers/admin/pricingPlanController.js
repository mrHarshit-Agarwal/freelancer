const PricingPlan = require('../../models/pricingPlanModel');

// Create
exports.createPricingPlan = async (req, res) => {
  try {
    const newPlan = new PricingPlan(req.body);
    await newPlan.save();
    res.status(201).json({ success: true, message: 'Plan created successfully', data: newPlan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Read All
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.find();
    res.status(200).json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Read One by Slug
exports.getPlanBySlug = async (req, res) => {
  try {
    const plan = await PricingPlan.findOne({ slug: req.params.slug });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.status(200).json({ success: true, data: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update
exports.updatePlanBySlug = async (req, res) => {
  try {
    const updated = await PricingPlan.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.status(200).json({ success: true, message: 'Plan updated', data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete
exports.deletePlanBySlug = async (req, res) => {
  try {
    const deleted = await PricingPlan.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.status(200).json({ success: true, message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
