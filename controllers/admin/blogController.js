const Blog = require('../../models/blogModel');

// CREATE
const createBlog = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newBlog = new Blog({ title, description, category, image, status });
    await newBlog.save();

    res.status(201).json({ message: 'Blog created', data: newBlog });
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
};

// READ ALL
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
};

// READ ONE
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
};

// UPDATE
const updateBlog = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    const updateData = { title, description, category, status };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog updated', data: updatedBlog });
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
};

// DELETE
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
