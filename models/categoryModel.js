const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    urlSlug: { type: String, required: true },
    image: { type: String },
    status: { type: Boolean, default: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Fix OverwriteModelError
module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
