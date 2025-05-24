const mongoose = require('mongoose');
const slugify = require('slugify');

const jobDetailSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyImage: { type: String },
  location: { type: String, required: true },
  email: { type: String, required: true },
  employees: { type: String },
  skills: [String],
  tags: [String],
  rating: { type: Number, default: 5 },
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: String },
  salary: { type: String },
  jobType: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  mapEmbedUrl: { type: String },
  additionalEmail: { type: String },
  phone: { type: String },
  slug: { type: String, unique: true },
  status: { type: Boolean, default: true }
}, { timestamps: true });

jobDetailSchema.pre('save', function(next) {
  this.slug = slugify(this.companyName + '-' + this.jobTitle, { lower: true });
  next();
});

module.exports = mongoose.model('JobDetail', jobDetailSchema);
