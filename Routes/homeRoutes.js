const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin/homeController');
const images = require('../middleware/multer');
const { getAllHomeData } = require('../controllers/admin/homeController');

// Home API to fetch all data in a single response
router.get('/home', controller.getAllHomeData);

//for hndle images 
const upload = images( "slider" , "clusterSlider", "category" , "service", "parentCategory", "featuredProject" , "latestProject", "topRatedProject", 
"teamCategory", "homeBlog", "testimonial", );

//slider
router.post("/slider", upload.single("image"), controller.createSlider);
router.get("/slider", controller.getAllSliders);
router.get("/slider/:slug", controller.getSliderBySlug);
router.put("/slider/:slug", upload.single("image"), controller.updateSliderBySlug);
router.delete("/slider/:slug", controller.deleteSliderBySlug);


// SubSlider

router.post("/clusterSlider", upload.single("image"), controller.createClusterSlider);
router.get("/clusterSlider", controller.getAllClusterSliders);
router.get("/clusterSlider/:slug", controller.getClusterSliderBySlug);
router.put("/clusterSlider/:slug", upload.single("image"), controller.updateClusterSliderBySlug);
router.delete("/clusterSlider/:slug", controller.deleteClusterSliderBySlug);

//hero section settings

router.post("/herosection", controller.createHeroSection);
router.get("/herosection", controller.getAllHeroSections);
router.get("/herosection/:slug", controller.getHeroSectionBySlug);
router.put("/herosection/:slug", controller.updateHeroSectionBySlug);
router.delete("/herosection/:slug", controller.deleteHeroSectionBySlug);


// Category
router.post("/category", upload.single("image"), controller.createCategory);
router.get("/category", controller.getCategories);
router.get("/category:slug", controller.getCategoryBySlug);
router.put("/category/:slug", upload.single("image"), controller.updateCategoryBySlug);
router.delete("/category/:slug", controller.deleteCategoryBySlug);

// Service
router.post("/service", upload.single("image"), controller.createService);
router.get("/service", controller.getServices);
router.get("/service/:slug", controller.getServiceBySlug);
router.put("/service/:slug", upload.single("image"), controller.updateServiceBySlug);
router.delete("/service/:slug", controller.deleteServiceBySlug);

//ParentCategory
router.post('/parentcategory', upload.single('image'), controller.createParentCategory);
router.get('/parentcategory', controller.getAllParentCategories);
router.get("/parentcategory/:slug", controller.getParentCategoryBySlug);
router.put("/parentcategory/:slug", upload.single("image"), controller.updateParentCategoryBySlug);
router.delete("/parentcategory/:slug", controller.deleteParentCategoryBySlug);


//FeaturedProject
router.post('/featuredprojects', upload.single('image'), controller.createFeaturedProject);
router.get('/featuredprojects', controller.getAllFeaturedProjects);
router.get("/featuredprojects/:slug", controller.getFeaturedProjectBySlug);
router.put("/featuredprojects/:slug", upload.single("image"), controller.updateFeaturedProjectBySlug);
router.delete("/featuredprojects/:slug", controller.deleteFeaturedProjectBySlug);



//latestProject
router.post('/latest-projects', upload.single('image'), controller.createLatestProject);
router.get('/latest-projects', controller.getAllLatestProjects);
router.get("/latest-projects/:slug", controller.getLatestProjectBySlug);
router.put("/latest-projects/:slug", upload.single("image"), controller.updateLatestProjectBySlug);
router.delete("/latest-projects/:slug", controller.deleteLatestProjectBySlug);

//TopratedProject
router.post('/toprated-projects', upload.single('image'), controller.createTopratedProject);
router.get('/toprated-projects', controller.getAllTopratedProjects);
router.get("/toprated-projects/:slug", controller.getTopRatedProjectBySlug);
router.put("/toprated-projects/:slug", upload.single("image"), controller.updateTopRatedProjectBySlug);
router.delete("/toprated-projects/:slug", controller.deleteTopRatedProjectBySlug);


//pricing plan
router.post("/pricing-plans", controller.createPricingPlan);
router.get("/pricing-plans", controller.getPricingPlans);
router.get("/pricing-plans/:slug", controller.getPricingPlanBySlug);
router.put("/pricing-plans/:slug", controller.updatePricingPlanBySlug);
router.delete("/pricing-plans/:slug", controller.deletePricingPlanBySlug);


//team category
router.post("/team-categories", upload.single("image"), controller.createTeamCategory);
router.get("/team-categories", controller.getTeamCategories);
router.get("/team-categories/:slug", controller.getTeamCategoryBySlug);
router.put("/team-categories/:slug", upload.single("image"), controller.updateTeamCategoryBySlug);
router.delete("/team-categories/:slug", controller.deleteTeamCategoryBySlug);


//blog
router.post("/homeblog", upload.single("image"), controller.createHomeBlog);
router.get("/homeblog", controller.getHomeBlogs);
router.get("/homeblog/:slug", controller.getHomeBlogBySlug);
router.put("/homeblog/:slug", upload.single("image"), controller.updateHomeBlogBySlug);
router.delete("/homeblog/:slug", controller.deleteHomeBlogBySlug);

//testimonials

router.post("/testimonials", upload.single("image"), controller.createTestimonial);
router.get("/testimonials", controller.getTestimonials);
router.get("/testimonials/:slug", controller.getTestimonialBySlug);
router.put("/testimonials/:slug", upload.single("image"), controller.updateTestimonialBySlug);
router.delete("/testimonials/:slug", controller.deleteTestimonialBySlug);


//faq

router.post("/faq", controller.createFaq);
router.get("/faq", controller.getFaqs);
router.get("/faq/:slug", controller.getFaqBySlug);
router.put("/faq/:slug", controller.updateFaqBySlug);
router.delete("/faq/:slug", controller.deleteFaqBySlug);


module.exports = router;
