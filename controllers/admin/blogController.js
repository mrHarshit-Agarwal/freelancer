const Blog = require("../../models/blogModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");


exports.createBlog = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const image = req.file?.filename;

    const blog = new Blog({ title, description, category, image, status });
    await blog.save();

    res.status(201).json({ success: true, message: "Blog created", data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create blog", error: err.message });
  }
};


exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs", error: err.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blog", error: err.message });
  }
};

exports.updateBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    const { title, description, category, status } = req.body;

    if (title) {
      blog.title = title;
      blog.slug = slugify(title, { lower: true, strict: true });
    }
    if (description) blog.description = description;
    if (category) blog.category = category;
    if (typeof status !== "undefined") blog.status = status;

    if (req.file) {
      if (blog.image) {
        const oldPath = path.join("uploads/blog", blog.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      blog.image = req.file.filename;
    }

    await blog.save();
    res.status(200).json({ success: true, message: "Blog updated", data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update blog", error: err.message });
  }
};

exports.deleteBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    if (blog.image) {
      const imagePath = path.join("uploads/blog", blog.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete blog", error: err.message });
  }
};
