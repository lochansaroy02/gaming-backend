// blog controller
const Blog = require('../models/blogModel');

const createBlog = async (req, res) => {
    console.log('Request Body:', req.body); // Debugging
    try {
        const { title, content, postedBy } = req.body;
        const newBlog = await Blog.create({ title, content, postedBy });
        res.status(201).json({ message: 'Blog created successfully', data: newBlog });
    } catch (error) {
        console.error('Error:', error.message); // Log the exact error
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, postedBy } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, postedBy }, { new: true });
    res.status(200).json(updatedBlog);
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog
}