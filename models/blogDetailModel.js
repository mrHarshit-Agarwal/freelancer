const mongoose = require("mongoose");
const slugify = require("slugify");

const blogDetailSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    commentCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    description1: { type: String },
    description2: { type: String },
    status: { type: Boolean, default: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

blogDetailSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("BlogDetail", blogDetailSchema);
