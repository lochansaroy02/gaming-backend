const express = require('express');
const { createArticle, getArticles, deleteArticle, updateArticle } = require('../controllers/articleController');

const router = express.Router();

router.post('/create', createArticle);
router.get('/get', getArticles);
router.delete('/delete/:id', deleteArticle);
router.put('/update/:id', updateArticle);

module.exports = router;
