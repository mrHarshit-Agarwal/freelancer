const mongoose = require('mongoose');

const homeSliderSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: Boolean, default: 1 },
  image: String,
});

const subSliderSchema = new mongoose.Schema({
  image: String,
  status: { type: Boolean, default: 1 },
});

const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: Boolean, default: 1 },
  image: String,
  urlSlug: String,
});

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: Boolean, default: 1 },
  image: String,
});

const parentCategorySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  freelancerCount: { 
    type: String, 
    default: "0+" 
  },
  image: String
});

const featuredProjectSchema = new mongoose.Schema({
  priceRange: String,
  priceType: String,
  duration: String,
  image: String,
  status: { type: Boolean, default: 1 }
});

const latestProjectSchema = new mongoose.Schema({
  title: String,
  bids: String,
  priceType: String,
  duration: String,
  description: String,
  priceRange: String,
  image: String,
  status: { type: Boolean, default: 1 }
});

const topratedProjectSchema = new mongoose.Schema({
  title: String,
  bids: String,
  priceType: String,
  duration: String,
  description: String,
  priceRange: String,
  image: String,
  status: { type: Boolean, default: 1 }
});

const pricingPlanSchema = new mongoose.Schema({
  title: String,
  price: Number,
  duration: String,
  tagline: String,
  description: String,
  features: [String],
  isRecommended: { type: Boolean, default: false },
  status: { type: Boolean, default: 1 }
});

const teamCategorySchema = new mongoose.Schema({
  name: String,
  designation: String,
  image: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    pinterest: String,
    instagram: String
  },
  status: { type: Boolean, default: 1 }
});

const homeBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publishDate: { type: Date, required: true },
  commentsCount: { type: Number, default: "0+" },
  shortDescription: { type: String },
  image: { type: String },
  status: { type: Boolean, default: true }
});

const testimonialSchema = new mongoose.Schema({
  name: String,
  designation: String,
  message: String,
  image: String,
  status: { type: Boolean, default: true }
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  status: { type: Boolean, default: true }
});







const HomeSlider = mongoose.model('HomeSlider', homeSliderSchema);
const SubSlider = mongoose.model( 'SubSlider', subSliderSchema);
const Category = mongoose.model('Category', categorySchema);
const Service = mongoose.model('Service', serviceSchema);
const ParentCategory = mongoose.model('ParentCategory', parentCategorySchema);
const FeaturedProject = mongoose.model('FeaturedProject', featuredProjectSchema);
const LatestProject = mongoose.model('LatestProject', latestProjectSchema);
const TopratedProject = mongoose.model('TopratedProject', topratedProjectSchema);
const PricingPlan = mongoose.model('PricingPlan', pricingPlanSchema);
const TeamCategory = mongoose.model('TeamCategory', teamCategorySchema);
const HomeBlog = mongoose.model('HomeBlog', homeBlogSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
const Faq = mongoose.model('Faq', faqSchema);


module.exports = {
  HomeSlider,
  SubSlider,
  Category,
  Service,
  ParentCategory,
  FeaturedProject,
  LatestProject,
  TopratedProject,
  PricingPlan,
  TeamCategory,
  HomeBlog,
  Testimonial,
  Faq,
};
