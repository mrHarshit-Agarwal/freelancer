const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin/homeController');
const upload = require('../middleware/multer');
const { getAllHomeData } = require('../controllers/admin/homeController');

// Home API to fetch all data in a single response
router.get('/home', controller.getAllHomeData);

// HomeSlider
router.post("/slider", upload.single("image"), controller.createSlider);
router.get("/slider", controller.getSliders);
router.put("/slider/:id", upload.single("image"), controller.updateSlider);
router.delete("/slider/:id", controller.deleteSlider);

// SubSlider
router.post("/sub-slider", upload.single("image"), controller.createSubSlider);
router.get("/sub-slider", controller.getSubSliders);
router.put("/sub-slider/:id", upload.single("image"), controller.updateSubSlider);
router.delete("/sub-slider/:id", controller.deleteSubSlider);

// Category
router.post("/category", upload.single("image"), controller.createCategory);
router.get("/category", controller.getCategories);
router.put("/category/:id", upload.single("image"), controller.updateCategory);
router.delete("/category/:id", controller.deleteCategory);

// Service
router.post("/service", upload.single("image"), controller.createService);
router.get("/service", controller.getServices);
router.put("/service/:id", upload.single("image"), controller.updateService);
router.delete("/service/:id", controller.deleteService);

//ParentCategory
router.post('/parentcategory', upload.single('image'), controller.createParentCategory);
router.get('/parentcategory', controller.getAllParentCategories);
router.put('/parentcategory/:id', upload.single('image'), controller.updateParentCategory);
router.delete('/parentcategory/:id', controller.deleteParentCategory);

//FeaturedProject
router.post('/featuredprojects', upload.single('image'), controller.createFeaturedProject);
router.get('/featuredprojects', controller.getAllFeaturedProjects);
router.put('/featuredprojects/:id', upload.single('image'), controller.updateFeaturedProject);
router.delete('/featuredprojects/:id', controller.deleteFeaturedProject);

//latestProject
router.post('/latest-projects', upload.single('image'), controller.createLatestProject);
router.get('/latest-projects', controller.getAllLatestProjects);
router.put('/latest-projects/:id', upload.single('image'), controller.updateLatestProject);
router.delete('/latest-projects/:id', controller.deleteLatestProject);

//TopratedProject
router.post('/toprated-projects', upload.single('image'), controller.createTopratedProject);
router.get('/toprated-projects', controller.getAllTopratedProjects);
router.put('/toprated-projects/:id', upload.single('image'), controller.updateTopratedProject);
router.delete('/toprated-projects/:id', controller.deleteTopratedProject);

//pricing plan
router.post('/pricing-plans', controller.createPlan);
router.get('/pricing-plans', controller.getAllPlans);
router.put('/pricing-plans/:id', controller.updatePlan);
router.delete('/pricing-plans/:id', controller.deletePlan);

//team category
router.post('/team-categories', upload.single('image'), controller.createTeamMember);
router.get('/team-categories', controller.getAllTeamMembers);
router.put('/team-categories/:id', upload.single('image'), controller.updateTeamMember);
router.delete('/team-categories/:id', controller.deleteTeamMember);

//blog
router.post('/homeblog', upload.single('image'), controller.createBlog);
router.get('/homeblog', controller.getAllBlogs);
router.put('/homeblog/:id', upload.single('image'), controller.updateBlog);
router.delete('/homeblog/:id', controller.deleteBlog);

//testimonials

router.post('/testimonials', upload.single('image'), controller.createTestimonial);
router.get('/testimonials', controller.getAllTestimonials);
router.put('/testimonials/:id', upload.single('image'), controller.updateTestimonial);
router.delete('/testimonials/:id', controller.deleteTestimonial);

//faq
router.post('/faq', controller.createFaq);
router.get('/faq', controller.getAllFaqs);
router.put('/faq/:id', controller.updateFaq);
router.delete('/faq/:id', controller.deleteFaq);


module.exports = router;
