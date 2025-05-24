const BlogDetail = require("../../models/blogDetailModel");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

module.exports = {
  // CREATE
  createBlogDetail: async (req, res) => {
    try {
      const { title, date, commentCount, description1, description2, status } = req.body;
      const image = req.file?.filename;

      const newBlog = new BlogDetail({
        title,
        date,
        commentCount,
        image,
        description1,
        description2,
        status,
      });

      await newBlog.save();
      res.status(201).json({ success: true, message: "Blog detail created successfully", data: newBlog });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating blog detail", error: error.message });
    }
  },

  // GET ALL
  getAllBlogDetails: async (req, res) => {
    try {
      const blogs = await BlogDetail.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching blog details", error: error.message });
    }
  },

  // GET BY SLUG
  getBlogDetailBySlug: async (req, res) => {
    try {
      const blog = await BlogDetail.findOne({ slug: req.params.slug });
      if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
      res.status(200).json({ success: true, data: blog });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching blog detail", error: error.message });
    }
  },

  // UPDATE BY SLUG
  updateBlogDetail: async (req, res) => {
    try {
      const blog = await BlogDetail.findOne({ slug: req.params.slug });
      if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

      const { title, date, commentCount, description1, description2, status } = req.body;

      if (req.file) {
        const oldPath = path.join("uploads/blogdetail", blog.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        blog.image = req.file.filename;
      }

      if (title) {
        blog.title = title;
        blog.slug = slugify(title, { lower: true, strict: true });
      }

      if (date) blog.date = date;
      if (typeof commentCount !== "undefined") blog.commentCount = commentCount;
      if (description1) blog.description1 = description1;
      if (description2) blog.description2 = description2;
      if (typeof status !== "undefined") blog.status = status;

      await blog.save();
      res.status(200).json({ success: true, message: "Blog detail updated", data: blog });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating blog detail", error: error.message });
    }
  },

  // DELETE BY SLUG
  deleteBlogDetail: async (req, res) => {
    try {
      const blog = await BlogDetail.findOneAndDelete({ slug: req.params.slug });
      if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

      const imgPath = path.join("uploads/blogdetail", blog.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

      res.status(200).json({ success: true, message: "Blog detail deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting blog detail", error: error.message });
    }
  }
};
