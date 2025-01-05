// blog routes
const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, updateBlog, deleteBlog } = require('../controllers/blogController');

router.post('/create', createBlog);
router.get('/get', getBlogs);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

module.exports = router;
