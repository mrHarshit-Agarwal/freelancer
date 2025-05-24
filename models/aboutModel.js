const mongoose = require("mongoose");
const slugify = require("slugify");

const aboutSchema = new mongoose.Schema({
  aboutTitle: {
    type: String,
    required: true,
  },
  aboutDescription: {
    type: String,
    required: true,
  },
  whatWeDoTitle: {
    type: String,
    required: true,
  },
  whatWeDoDescription: {
    type: String,
    required: true,
  },
  weDoDifferentlyTitle: {
    type: String,
    required: true,
  },
  totalFreelancers: String,
  positiveReviews: String,
  projectsCompleted: String,
  satisfiedUsers: String,
  testimonial: [
    {
      name: String,
      position: String,
      message: String,
      image: String,
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  slug: {
    type: String,
    unique: true,
  },
}, { timestamps: true });

// Generate slug from aboutTitle
aboutSchema.pre("save", function (next) {
  if (this.isModified("aboutTitle")) {
    this.slug = slugify(this.aboutTitle, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("About", aboutSchema);
