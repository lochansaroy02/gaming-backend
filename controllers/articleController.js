const { Article } = require('../models/articleModel');

const createArticle = async (req, res) => {
    const { category, heading, content } = req.body;
    const newArticle = new Article({ category, heading, content });
    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully', article: newArticle });
}

const getArticles = async (req, res) => {
    const articles = await Article.find();
    res.status(200).json({ articles });
}


const deleteArticle = async (req, res) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: 'Article deleted successfully' });
}

const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { heading, content } = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { heading, content },
            { new: true }
        );
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the article" });
    }
}
module.exports = { createArticle, getArticles, deleteArticle, updateArticle };
