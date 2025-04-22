const BlogDetail = require('../../models/blogDetailModel');
const fs = require('fs');
const path = require('path');

module.exports = {
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
        status
      });

      await newBlog.save();
      res.status(201).json({ success: true, message: 'Blog detail created successfully', data: newBlog });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating blog detail', error: error.message });
    }
  },

  getAllBlogDetails: async (req, res) => {
    try {
      const blogs = await BlogDetail.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching blog details', error: error.message });
    }
  },

  getBlogDetailById: async (req, res) => {
    try {
      const blog = await BlogDetail.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }
      res.status(200).json({ success: true, data: blog });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching blog detail', error: error.message });
    }
  },

  updateBlogDetail: async (req, res) => {
    try {
      const { title, date, commentCount, description1, description2, status } = req.body;
      const blog = await BlogDetail.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      if (req.file) {
        // Delete old image
        if (blog.image) {
          fs.unlinkSync(path.join(__dirname, '../uploads', blog.image));
        }
        blog.image = req.file.filename;
      }

      blog.title = title || blog.title;
      blog.date = date || blog.date;
      blog.commentCount = commentCount || blog.commentCount;
      blog.description1 = description1 || blog.description1;
      blog.description2 = description2 || blog.description2;
      blog.status = status !== undefined ? status : blog.status;

      await blog.save();
      res.status(200).json({ success: true, message: 'Blog detail updated', data: blog });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating blog detail', error: error.message });
    }
  },

  deleteBlogDetail: async (req, res) => {
    try {
      const blog = await BlogDetail.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      // Delete image
      if (blog.image) {
        fs.unlinkSync(path.join(__dirname, '../uploads', blog.image));
      }

      await BlogDetail.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Blog detail deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting blog detail', error: error.message });
    }
  }
};
