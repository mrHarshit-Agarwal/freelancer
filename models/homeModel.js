const mongoose = require('mongoose');
const slugify = require("slugify");

const sliderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true }
});

sliderSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});


const clusterSliderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  status: { type: Boolean, default: 1 },
  slug: { type: String, unique: true },
});

clusterSliderSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const HeroSectionSettingSchema = new mongoose.Schema({
  topTitle: { type: String },
  highlightedTitle: { type: String },
  bottomTitle: { type: String },
  subTitle: { type: String },
  count: { type: mongoose.Schema.Types.Mixed },
  searchBarStatus: { type: Boolean, default: true },
  sliderStatus: { type: Boolean, default: true },
  clusterSliderStatus: { type: Boolean, default: true },
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

HeroSectionSettingSchema.pre("save", function (next) {
  if (this.isModified("topTitle")) {
    this.slug = slugify(this.topTitle, { lower: true, strict: true });
  }
  next();
});

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: Boolean, default: true },
  image: String,
  slug: { type: String, unique: true }
});

categorySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: Boolean, default: true },
  image: String,
  slug: { type: String, unique: true },
});

serviceSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const parentCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  freelancerCount: { type: String, default: "0+" },
  image: String,
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

parentCategorySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


const featuredProjectSchema = new mongoose.Schema({
  priceRange: String,
  priceType: String,
  duration: String,
  image: String,
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

featuredProjectSchema.pre("save", function (next) {
  const slugBase = `${this.priceType || ""}-${this.duration || ""}-${Date.now()}`;
  this.slug = slugify(slugBase, { lower: true, strict: true });
  next();
});

const latestProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bids: String,
  priceType: String,
  duration: String,
  description: String,
  priceRange: String,
  image: String,
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

latestProjectSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const topratedProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bids: String,
  priceType: String,
  duration: String,
  description: String,
  priceRange: String,
  image: String,
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

topratedProjectSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const pricingPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: Number,
  duration: String,
  tagline: String,
  description: String,
  features: [String],
  isRecommended: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

pricingPlanSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const teamCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  image: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    pinterest: String,
    instagram: String,
  },
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

teamCategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const homeBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publishDate: { type: Date, required: true },
  commentsCount: { type: String, default: "0+" },
  shortDescription: { type: String },
  image: { type: String },
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

homeBlogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  message: String,
  image: String,
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

testimonialSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  status: { type: Boolean, default: true },
  slug: { type: String, unique: true },
});

faqSchema.pre("save", function (next) {
  if (this.isModified("question")) {
    this.slug = slugify(this.question, { lower: true, strict: true });
  }
  next();
});



const Slider = mongoose.model('Slider', sliderSchema);
const ClusterSlider = mongoose.model("ClusterSlider", clusterSliderSchema);
const HeroSectionSetting =  mongoose.model("HeroSectionSetting", HeroSectionSettingSchema);
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
  Slider,
  ClusterSlider,
  HeroSectionSetting,
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
