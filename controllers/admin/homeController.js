const { HomeSlider, SubSlider, Category, Service, Home, parentCategory, ParentCategory, FeaturedProject, LatestProject, TopratedProject, PricingPlan, TeamCategory, Blog, Testimonial, Faq, HomeBlog } = require('../../models/homeModel');

// HomeSlider
const createSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const slider = await HomeSlider.create({ ...req.body, image });
    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSliders = async (req, res) => {
  try {
    const sliders = await HomeSlider.find();
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await HomeSlider.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSlider = async (req, res) => {
  try {
    await HomeSlider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slider deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SubSlider
const createSubSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const slider = await SubSlider.create({ ...req.body, image });
    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubSliders = async (req, res) => {
  try {
    const sliders = await SubSlider.find();
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSubSlider = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await SubSlider.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSubSlider = async (req, res) => {
  try {
    await SubSlider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sub slider deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Category
const createCategory = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const category = await Category.create({ ...req.body, image });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Service
const createService = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const service = await Service.create({ ...req.body, image });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const updateData = { ...req.body };
    if (image) updateData.image = image;

    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//parent category

const createParentCategory = async (req, res) => {
  try {
    const { title, freelancerCount } = req.body;
    const image = req.file ? req.file.filename : null;

    const newCategory = new ParentCategory({ title, freelancerCount, image });
    await newCategory.save();

    res.status(201).json({ success: true, message: 'Parent category created', data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating category', error: error.message });
  }
};

const getAllParentCategories = async (req, res) => {
  try {
    const categories = await ParentCategory.find().sort({ _id: -1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
  }
};

const updateParentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, freelancerCount } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { title, freelancerCount };
    if (image) updateData.image = image;

    const updatedCategory = await ParentCategory.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category updated', data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating category', error: error.message });
  }
};

const deleteParentCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await ParentCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting category', error: error.message });
  }
};

//FeaturedProject

const createFeaturedProject = async (req, res) => {
  try {
    const { priceRange, priceType, duration } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProject = new FeaturedProject({ priceRange, priceType, duration, image });
    await newProject.save();
    res.status(201).json({ message: 'Project created', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed' });
  }
};

const getAllFeaturedProjects = async (req, res) => {
  try {
    const projects = await FeaturedProject.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

const updateFeaturedProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { priceRange, priceType, duration } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { priceRange, priceType, duration };
    if (image) updateData.image = image;

    const updated = await FeaturedProject.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Project updated', updated });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteFeaturedProject = async (req, res) => {
  try {
    const { id } = req.params;
    await FeaturedProject.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

//latest project 
const createLatestProject = async (req, res) => {
  try {
    const { title, bids, priceType, duration, description, priceRange } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProject = new LatestProject({ title, bids, priceType, duration, description, priceRange, image });
    await newProject.save();
    res.status(201).json({ message: 'Latest project created', newProject });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed' });
  }
};

const getAllLatestProjects = async (req, res) => {
  try {
    const projects = await LatestProject.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Fetching projects failed' });
  }
};

const updateLatestProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, bids, priceType, duration, description, priceRange } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { title, bids, priceType, duration, description, priceRange };
    if (image) updateData.image = image;

    const updated = await LatestProject.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Project updated', updated });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteLatestProject = async (req, res) => {
  try {
    const { id } = req.params;
    await LatestProject.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

//TopratedProject

const createTopratedProject = async (req, res) => {
  try {
    const { title, bids, priceType, duration, description, priceRange } = req.body;
    const image = req.file ? req.file.filename : null;

    const project = new TopratedProject({ title, bids, priceType, duration, description, priceRange, image });
    await project.save();
    res.status(201).json({ message: 'Toprated project created', project });
  } catch (error) {
    res.status(500).json({ error: 'Create failed' });
  }
};

const getAllTopratedProjects = async (req, res) => {
  try {
    const projects = await TopratedProject.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

const updateTopratedProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, bids, priceType, duration, description, priceRange } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { title, bids, priceType, duration, description, priceRange };
    if (image) updateData.image = image;

    const updated = await TopratedProject.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Project updated', updated });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteTopratedProject = async (req, res) => {
  try {
    const { id } = req.params;
    await TopratedProject.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

//priing plan
const createPlan = async (req, res) => {
  try {
    const { title, price, duration, tagline, description, features, isRecommended } = req.body;

    const newPlan = new PricingPlan({
      title,
      price,
      duration,
      tagline,
      description,
      features: Array.isArray(features) ? features : features.split('\n'),
      isRecommended
    });

    await newPlan.save();
    res.status(201).json({ message: 'Pricing plan created', newPlan });
  } catch (err) {
    res.status(500).json({ error: 'Creation failed' });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, duration, tagline, description, features, isRecommended } = req.body;

    const updateData = {
      title,
      price,
      duration,
      tagline,
      description,
      features: Array.isArray(features) ? features : features.split('\n'),
      isRecommended
    };

    const updatedPlan = await PricingPlan.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Plan updated', updatedPlan });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await PricingPlan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

// team category
const createTeamMember = async (req, res) => {
  try {
    const { name, designation, socialLinks } = req.body;
    const image = req.file ? req.file.filename : null;

    let parsedSocialLinks = [];
    if (socialLinks) {
      try {
        parsedSocialLinks = JSON.parse(socialLinks);
      } catch (parseError) {
        return res.status(400).json({ error: 'Invalid socialLinks format' });
      }
    }

    const member = new TeamCategory({
      name,
      designation,
      image,
      socialLinks: parsedSocialLinks
    });

    await member.save();
    res.status(201).json({ message: 'Team member created', member });
  } catch (err) {
    console.log("Create Team Member Error:", err); // <--- important
    res.status(500).json({ error: 'Create failed' });
  }
};

const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamCategory.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, socialLinks } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = {
      name,
      designation,
      socialLinks: JSON.parse(socialLinks)
    };
    if (image) updateData.image = image;

    const updated = await TeamCategory.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Team member updated', updated });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await TeamCategory.findByIdAndDelete(id);
    res.status(200).json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

//blog
const createBlog = async (req, res) => {
  try {
    const { title, publishDate, commentsCount, shortDescription } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !publishDate) {
      return res.status(400).json({ error: 'Title and publishDate are required' });
    }

    const newBlog = new HomeBlog({
      title,
      publishDate: new Date(publishDate),
      commentsCount: Number(commentsCount),
      shortDescription,
      image
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created', newBlog });
  } catch (error) {
    console.log("Create Blog Error:", error); // log error to see in console
    res.status(500).json({ error: 'Create failed', message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await HomeBlog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, publishDate, commentsCount, shortDescription } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = {
      title,
      publishDate,
      commentsCount,
      shortDescription
    };
    if (image) updateData.image = image;

    const updatedBlog = await HomeBlog.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Blog updated', updatedBlog });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await HomeBlog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

// Testimonial

const createTestimonial = async (req, res) => {
  try {
    const { name, designation, message } = req.body;
    const image = req.file ? req.file.filename : null;

    const newTestimonial = new Testimonial({ name, designation, message, image });
    await newTestimonial.save();
    res.status(201).json({ message: 'Testimonial created', newTestimonial });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed' });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, message } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { name, designation, message };
    if (image) updateData.image = image;

    const updated = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Testimonial updated', updated });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.status(200).json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

//faq
const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const newFaq = new Faq({ question, answer });
    await newFaq.save();
    res.status(201).json({ message: 'FAQ created', newFaq });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed' });
  }
};

const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updatedFaq = await Faq.findByIdAndUpdate(id, { question, answer }, { new: true });
    res.status(200).json({ message: 'FAQ updated', updatedFaq });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    await Faq.findByIdAndDelete(id);
    res.status(200).json({ message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};




// Get all home data in one request
const getAllHomeData = async (req, res) => {
  try {
    const slider = await HomeSlider.find();
    const subSlider = await SubSlider.find();
    const category = await Category.find();
    const service = await Service.find();
    const parentCategory = await ParentCategory.find();
    const  featuredproject = await FeaturedProject.find();
    const latestProject = await LatestProject.find();
    const topratedProject = await TopratedProject.find();
    const pricingPlan = await PricingPlan.find();
    const teamCategory = await TeamCategory.find();
    const homeblog = await HomeBlog.find();
    const testimonials = await Testimonial.find();
    const faq = await Faq.find();



    

    res.status(200).json({ slider, subSlider, category, service, parentCategory, featuredproject, latestProject, topratedProject,
       pricingPlan, teamCategory, homeblog, testimonials, faq });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  // HomeSlider
  createSlider,
  getSliders,
  updateSlider,
  deleteSlider,

  // SubSlider
  createSubSlider,
  getSubSliders,
  updateSubSlider,
  deleteSubSlider,

  // Category
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,

  // Service
  createService,
  getServices,
  updateService,
  deleteService,

  //parentCategory
  createParentCategory,
  getAllParentCategories,
  updateParentCategory,
  deleteParentCategory,

  //featured project
  createFeaturedProject,
  getAllFeaturedProjects,
  updateFeaturedProject,
  deleteFeaturedProject,

  //latest projects
  createLatestProject,
  getAllLatestProjects,
  updateLatestProject,
  deleteLatestProject,

  //TopratedProject
  createTopratedProject,
  getAllTopratedProjects,
  updateTopratedProject,
  deleteTopratedProject,

  //pricing plans
  createPlan,
  getAllPlans,
  updatePlan, 
  deletePlan,

  //team category 
  createTeamMember,
  getAllTeamMembers,
  updateTeamMember,
  deleteTeamMember,

  //blog
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,

  //testimonials
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,

  //faq
  createFaq,
  getAllFaqs,
  updateFaq,
  deleteFaq,




  // Get all data in one request
  getAllHomeData,
};
