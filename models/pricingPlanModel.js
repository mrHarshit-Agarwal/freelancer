const mongoose = require('mongoose');
const slugify = require('slugify');

const pricingPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  isRecommended: { type: Boolean, default: false },
  slug: { type: String, unique: true },
}, { timestamps: true });

pricingPlanSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Fix OverwriteModelError
module.exports = mongoose.models.PricingPlan || mongoose.model('PricingPlan', pricingPlanSchema);
