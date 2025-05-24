const { Slider, ClusterSlider, Category, Service, ParentCategory, FeaturedProject, LatestProject, TopratedProject, PricingPlan, TeamCategory, Blog, Testimonial, Faq, HomeBlog, HeroSectionSetting } = require('../../models/homeModel');
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

// HomeSlider
const createSlider = async (req, res) => {
  try {
    const { name, status } = req.body;
    const image = req.file?.filename;

    const slider = new Slider({ name, status, image });
    await slider.save();

    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSliderBySlug = async (req, res) => {
  try {
    const slider = await Slider.findOne({ slug: req.params.slug });
    if (!slider) return res.status(404).json({ error: "Slider not found" });
    res.json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSliderBySlug = async (req, res) => {
  try {
    const { name, status } = req.body;
    const slider = await Slider.findOne({ slug: req.params.slug });
    if (!slider) return res.status(404).json({ error: "Slider not found" });

    if (name) {
      slider.name = name;
      slider.slug = slugify(name, { lower: true, strict: true });
    }

    if (typeof status !== "undefined") slider.status = status;

    if (req.file) {
      if (slider.image) {
        const oldPath = path.join("uploads/slider", slider.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      slider.image = req.file.filename;
    }

    await slider.save();
    res.json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSliderBySlug = async (req, res) => {
  try {
    const slider = await Slider.findOneAndDelete({ slug: req.params.slug });
    if (!slider) return res.status(404).json({ error: "Slider not found" });

    if (slider.image) {
      const imgPath = path.join("uploads/slider", slider.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Slider deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// SubSlider
const createClusterSlider = async (req, res) => {
  try {
    const { name, status } = req.body;
    const image = req.file?.filename;

    const slider = new ClusterSlider({ name, image, status });
    await slider.save();

    res.status(201).json({ message: "Cluster slider created", data: slider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllClusterSliders = async (req, res) => {
  try {
    const sliders = await ClusterSlider.find();
    res.status(200).json(sliders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClusterSliderBySlug = async (req, res) => {
  try {
    const slider = await ClusterSlider.findOne({ slug: req.params.slug });
    if (!slider) return res.status(404).json({ error: "Not found" });

    res.status(200).json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateClusterSliderBySlug = async (req, res) => {
  try {
    const { name, status } = req.body;
    const slider = await ClusterSlider.findOne({ slug: req.params.slug });
    if (!slider) return res.status(404).json({ error: "Not found" });

    if (req.file) {
      if (slider.image) {
        const oldPath = path.join("uploads/clusterSlider", slider.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      slider.image = req.file.filename;
    }

    if (name) slider.name = name;
    if (typeof status !== "undefined") slider.status = status;

    await slider.save();
    res.status(200).json({ message: "Updated successfully", data: slider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClusterSliderBySlug = async (req, res) => {
  try {
    const slider = await ClusterSlider.findOneAndDelete({ slug: req.params.slug });
    if (!slider) return res.status(404).json({ error: "Not found" });

    if (slider.image) {
      const imgPath = path.join("uploads/clusterSlider", slider.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//hero section settings
const createHeroSection = async (req, res) => {
  try {
    const hero = new HeroSectionSetting(req.body);
    await hero.save();
    res.status(201).json({ message: "Hero section setting created", data: hero });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllHeroSections = async (req, res) => {
  try {
    const sections = await HeroSectionSetting.find();
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHeroSectionBySlug = async (req, res) => {
  try {
    const hero = await HeroSectionSetting.findOne({ slug: req.params.slug });
    if (!hero) return res.status(404).json({ error: "Hero section not found" });
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateHeroSectionBySlug = async (req, res) => {
  try {
    const hero = await HeroSectionSetting.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!hero) return res.status(404).json({ error: "Hero section not found" });
    res.status(200).json({ message: "Hero section updated", data: hero });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteHeroSectionBySlug = async (req, res) => {
  try {
    const hero = await HeroSectionSetting.findOneAndDelete({ slug: req.params.slug });
    if (!hero) return res.status(404).json({ error: "Hero section not found" });
    res.status(200).json({ message: "Hero section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createCategory = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const image = req.file?.filename;

    const category = new Category({
      title,
      description,
      status,
      image,
    });

    await category.save();
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

const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategoryBySlug = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Category not found" });

    if (title) {
      category.title = title;
      category.slug = slugify(title, { lower: true, strict: true });
    }

    if (description) category.description = description;
    if (typeof status !== "undefined") category.status = status;
    if (req.file) {
      if (category.image) {
        const oldPath = path.join("uploads/category", category.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      category.image = req.file.filename;
    }

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Category not found" });

    if (category.image) {
      const imgPath = path.join("uploads/category", category.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Service
const createService = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const image = req.file?.filename;

    const service = new Service({ title, description, status, image });
    await service.save();

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

const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateServiceBySlug = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: "Service not found" });

    if (title) {
      service.title = title;
      service.slug = slugify(title, { lower: true, strict: true });
    }

    if (description) service.description = description;
    if (typeof status !== "undefined") service.status = status;

    if (req.file) {
      if (service.image) {
        const oldPath = path.join("uploads/service", service.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      service.image = req.file.filename;
    }

    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: "Service not found" });

    if (service.image) {
      const imgPath = path.join("uploads/service", service.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//parent category
const createParentCategory = async (req, res) => {
  try {
    const { title, freelancerCount, status } = req.body;
    const image = req.file?.filename;

    const category = new ParentCategory({ title, freelancerCount, image, status });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllParentCategories = async (req, res) => {
  try {
    const categories = await ParentCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getParentCategoryBySlug = async (req, res) => {
  try {
    const category = await ParentCategory.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Parent category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateParentCategoryBySlug = async (req, res) => {
  try {
    const { title, freelancerCount, status } = req.body;
    const category = await ParentCategory.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Parent category not found" });

    if (title) {
      category.title = title;
      category.slug = slugify(title, { lower: true, strict: true });
    }

    if (freelancerCount) category.freelancerCount = freelancerCount;
    if (typeof status !== "undefined") category.status = status;

    if (req.file) {
      if (category.image) {
        const oldPath = path.join("uploads/parentCategory", category.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      category.image = req.file.filename;
    }

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteParentCategoryBySlug = async (req, res) => {
  try {
    const category = await ParentCategory.findOneAndDelete({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Parent category not found" });

    if (category.image) {
      const imgPath = path.join("uploads/parentCategory", category.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Parent category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//FeaturedProject

const createFeaturedProject = async (req, res) => {
  try {
    const { priceRange, priceType, duration, status } = req.body;
    const image = req.file?.filename;

    const project = new FeaturedProject({ priceRange, priceType, duration, image, status });
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFeaturedProjects = async (req, res) => {
  try {
    const projects = await FeaturedProject.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeaturedProjectBySlug = async (req, res) => {
  try {
    const project = await FeaturedProject.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFeaturedProjectBySlug = async (req, res) => {
  try {
    const { priceRange, priceType, duration, status } = req.body;
    const project = await FeaturedProject.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (priceRange) project.priceRange = priceRange;
    if (priceType) project.priceType = priceType;
    if (duration) project.duration = duration;
    if (typeof status !== "undefined") project.status = status;

    if (req.file) {
      if (project.image) {
        const oldPath = path.join("uploads/featuredProject", project.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      project.image = req.file.filename;
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFeaturedProjectBySlug = async (req, res) => {
  try {
    const project = await FeaturedProject.findOneAndDelete({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.image) {
      const imgPath = path.join("uploads/featuredProject", project.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//latest project 
const createLatestProject = async (req, res) => {
  try {
    const { title, bids, priceType, duration, description, priceRange, status } = req.body;
    const image = req.file?.filename;

    const project = new LatestProject({
      title,
      bids,
      priceType,
      duration,
      description,
      priceRange,
      image,
      status
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllLatestProjects = async (req, res) => {
  try {
    const projects = await LatestProject.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLatestProjectBySlug = async (req, res) => {
  try {
    const project = await LatestProject.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Latest project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLatestProjectBySlug = async (req, res) => {
  try {
    const project = await LatestProject.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Latest project not found" });

    const {
      title,
      bids,
      priceType,
      duration,
      description,
      priceRange,
      status
    } = req.body;

    if (title) {
      project.title = title;
      project.slug = slugify(title, { lower: true, strict: true });
    }

    if (bids) project.bids = bids;
    if (priceType) project.priceType = priceType;
    if (duration) project.duration = duration;
    if (description) project.description = description;
    if (priceRange) project.priceRange = priceRange;
    if (typeof status !== "undefined") project.status = status;

    if (req.file) {
      if (project.image) {
        const oldPath = path.join("uploads/latestProject", project.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      project.image = req.file.filename;
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLatestProjectBySlug = async (req, res) => {
  try {
    const project = await LatestProject.findOneAndDelete({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Latest project not found" });

    if (project.image) {
      const imgPath = path.join("uploads/latestProject", project.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Latest project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//TopratedProject

const createTopratedProject = async (req, res) => {
  try {
    const { title, bids, priceType, duration, description, priceRange, status } = req.body;
    const image = req.file?.filename;

    const project = new TopRatedProject({
      title,
      bids,
      priceType,
      duration,
      description,
      priceRange,
      image,
      status,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTopratedProjects = async (req, res) => {
  try {
    const projects = await TopRatedProject.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTopRatedProjectBySlug = async (req, res) => {
  try {
    const project = await TopRatedProject.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTopRatedProjectBySlug = async (req, res) => {
  try {
    const project = await TopRatedProject.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const { title, bids, priceType, duration, description, priceRange, status } = req.body;

    if (title) {
      project.title = title;
      project.slug = slugify(title, { lower: true, strict: true });
    }

    if (bids) project.bids = bids;
    if (priceType) project.priceType = priceType;
    if (duration) project.duration = duration;
    if (description) project.description = description;
    if (priceRange) project.priceRange = priceRange;
    if (typeof status !== "undefined") project.status = status;

    if (req.file) {
      if (project.image) {
        const oldPath = path.join("uploads/topRatedProject", project.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      project.image = req.file.filename;
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTopRatedProjectBySlug = async (req, res) => {
  try {
    const project = await TopRatedProject.findOneAndDelete({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.image) {
      const imgPath = path.join("uploads/topRatedProject", project.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Top Rated Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//priing plan
const createPricingPlan = async (req, res) => {
  try {
    const plan = new PricingPlan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPricingPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPricingPlanBySlug = async (req, res) => {
  try {
    const plan = await PricingPlan.findOne({ slug: req.params.slug });
    if (!plan) return res.status(404).json({ error: "Pricing plan not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePricingPlanBySlug = async (req, res) => {
  try {
    const plan = await PricingPlan.findOne({ slug: req.params.slug });
    if (!plan) return res.status(404).json({ error: "Pricing plan not found" });

    const {
      title,
      price,
      duration,
      tagline,
      description,
      features,
      isRecommended,
      status,
    } = req.body;

    if (title) {
      plan.title = title;
      plan.slug = slugify(title, { lower: true, strict: true });
    }

    if (typeof price !== "undefined") plan.price = price;
    if (duration) plan.duration = duration;
    if (tagline) plan.tagline = tagline;
    if (description) plan.description = description;
    if (features) plan.features = features;
    if (typeof isRecommended !== "undefined") plan.isRecommended = isRecommended;
    if (typeof status !== "undefined") plan.status = status;

    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePricingPlanBySlug = async (req, res) => {
  try {
    const plan = await PricingPlan.findOneAndDelete({ slug: req.params.slug });
    if (!plan) return res.status(404).json({ error: "Pricing plan not found" });
    res.json({ message: "Pricing plan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// team category

const createTeamCategory = async (req, res) => {
  try {
    const { name, designation, socialLinks, status } = req.body;
    const image = req.file?.filename;

    const category = new TeamCategory({
      name,
      designation,
      image,
      socialLinks,
      status,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTeamCategories = async (req, res) => {
  try {
    const categories = await TeamCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTeamCategoryBySlug = async (req, res) => {
  try {
    const category = await TeamCategory.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Team category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTeamCategoryBySlug = async (req, res) => {
  try {
    const category = await TeamCategory.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Team category not found" });

    const { name, designation, socialLinks, status } = req.body;

    if (name) {
      category.name = name;
      category.slug = slugify(name, { lower: true, strict: true });
    }

    if (designation) category.designation = designation;
    if (socialLinks) category.socialLinks = socialLinks;
    if (typeof status !== "undefined") category.status = status;

    if (req.file) {
      if (category.image) {
        const oldPath = path.join("uploads/teamCategory", category.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      category.image = req.file.filename;
    }

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTeamCategoryBySlug = async (req, res) => {
  try {
    const category = await TeamCategory.findOneAndDelete({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Team category not found" });

    if (category.image) {
      const imgPath = path.join("uploads/teamCategory", category.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Team category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//blog

const createHomeBlog = async (req, res) => {
  try {
    const { title, publishDate, commentsCount, shortDescription, status } = req.body;
    const image = req.file?.filename;

    const blog = new HomeBlog({
      title,
      publishDate,
      commentsCount,
      shortDescription,
      image,
      status,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getHomeBlogs = async (req, res) => {
  try {
    const blogs = await HomeBlog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHomeBlogBySlug = async (req, res) => {
  try {
    const blog = await HomeBlog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateHomeBlogBySlug = async (req, res) => {
  try {
    const blog = await HomeBlog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const { title, publishDate, commentsCount, shortDescription, status } = req.body;

    if (title) {
      blog.title = title;
      blog.slug = slugify(title, { lower: true, strict: true });
    }
    if (publishDate) blog.publishDate = publishDate;
    if (commentsCount) blog.commentsCount = commentsCount;
    if (shortDescription) blog.shortDescription = shortDescription;
    if (typeof status !== "undefined") blog.status = status;

    if (req.file) {
      if (blog.image) {
        const oldPath = path.join("uploads/homeBlog", blog.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      blog.image = req.file.filename;
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteHomeBlogBySlug = async (req, res) => {
  try {
    const blog = await HomeBlog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (blog.image) {
      const imgPath = path.join("uploads/homeBlog", blog.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Testimonial

const createTestimonial = async (req, res) => {
  try {
    const { name, designation, message, status } = req.body;
    const image = req.file?.filename;

    const testimonial = new Testimonial({
      name,
      designation,
      message,
      image,
      status,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTestimonialBySlug = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ slug: req.params.slug });
    if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTestimonialBySlug = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ slug: req.params.slug });
    if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });

    const { name, designation, message, status } = req.body;

    if (name) {
      testimonial.name = name;
      testimonial.slug = slugify(name, { lower: true, strict: true });
    }

    if (designation) testimonial.designation = designation;
    if (message) testimonial.message = message;
    if (typeof status !== "undefined") testimonial.status = status;

    if (req.file) {
      if (testimonial.image) {
        const oldPath = path.join("uploads/testimonial", testimonial.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      testimonial.image = req.file.filename;
    }

    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTestimonialBySlug = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOneAndDelete({ slug: req.params.slug });
    if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });

    if (testimonial.image) {
      const imgPath = path.join("uploads/testimonial", testimonial.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//faq
const createFaq = async (req, res) => {
  try {
    const { question, answer, status } = req.body;

    const faq = new Faq({ question, answer, status });
    await faq.save();

    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFaqBySlug = async (req, res) => {
  try {
    const faq = await Faq.findOne({ slug: req.params.slug });
    if (!faq) return res.status(404).json({ error: "FAQ not found" });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFaqBySlug = async (req, res) => {
  try {
    const faq = await Faq.findOne({ slug: req.params.slug });
    if (!faq) return res.status(404).json({ error: "FAQ not found" });

    const { question, answer, status } = req.body;

    if (question) {
      faq.question = question;
      faq.slug = slugify(question, { lower: true, strict: true });
    }

    if (answer) faq.answer = answer;
    if (typeof status !== "undefined") faq.status = status;

    await faq.save();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFaqBySlug = async (req, res) => {
  try {
    const faq = await Faq.findOneAndDelete({ slug: req.params.slug });
    if (!faq) return res.status(404).json({ error: "FAQ not found" });

    res.json({ message: "FAQ deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Get all home data in one request
const getAllHomeData = async (req, res) => {
  try {
    const slider = await Slider.find();
    const clusterSlider = await ClusterSlider.find();
    const heroSectionSetting = await HeroSectionSetting.find();
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



    

    res.status(200).json({ slider, clusterSlider, heroSectionSetting, category, service, parentCategory, featuredproject, latestProject, topratedProject,
       pricingPlan, teamCategory, homeblog, testimonials, faq });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  // Slider
  createSlider,
  getSliderBySlug,
  getAllSliders,
  updateSliderBySlug,
  deleteSliderBySlug,

  // SubSlider
  createClusterSlider,
  getClusterSliderBySlug,
  getAllClusterSliders,
  updateClusterSliderBySlug,
  deleteClusterSliderBySlug,

  // hero section settings
  createHeroSection,
  getHeroSectionBySlug,
  getAllHeroSections, 
  updateHeroSectionBySlug,
  deleteHeroSectionBySlug,

  // Category
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategoryBySlug,
  deleteCategoryBySlug,

  // Service
  createService,
  getServices,
  getServiceBySlug,
  updateServiceBySlug,
  deleteServiceBySlug,

  //parentCategory
  createParentCategory,
  getAllParentCategories,
  getParentCategoryBySlug,
  updateParentCategoryBySlug,
  deleteParentCategoryBySlug,

  //featured project
  createFeaturedProject,
  getAllFeaturedProjects,
  getFeaturedProjectBySlug,
  updateFeaturedProjectBySlug,
  deleteFeaturedProjectBySlug,

  //latest projects
  createLatestProject,
  getAllLatestProjects,
  getLatestProjectBySlug,
  updateLatestProjectBySlug,
  deleteLatestProjectBySlug,

  //TopratedProject
  createTopratedProject,
  getAllTopratedProjects,
  getTopRatedProjectBySlug,
  updateTopRatedProjectBySlug,
  deleteTopRatedProjectBySlug,

  //pricing plans
  createPricingPlan,
  getPricingPlans,
  getPricingPlanBySlug,
  updatePricingPlanBySlug, 
  deletePricingPlanBySlug,

  //team category 
  createTeamCategory,
  getTeamCategories, 
  getTeamCategoryBySlug,
  updateTeamCategoryBySlug,
  deleteTeamCategoryBySlug,

  //blog
  createHomeBlog, 
  getHomeBlogs,
  getHomeBlogBySlug,
  updateHomeBlogBySlug,
  deleteHomeBlogBySlug,

  //testimonials
  createTestimonial,
  getTestimonials,
  getTestimonialBySlug,
  updateTestimonialBySlug,
  deleteTestimonialBySlug,

  //faq
 createFaq,
 getFaqs,
 getFaqBySlug,
 updateFaqBySlug,
 deleteFaqBySlug,
 

  // Get all data in one request
  getAllHomeData,
};
