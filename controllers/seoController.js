const { SEO } = require('../models/seoModel');

const createSEO = async (req, res) => {
    try {
        const { title, description, keywords, page } = req.body;
        const seo = new SEO({ title, description, keywords: keywords || [], page });
        await seo.save();
        res.status(201).json({ seo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllSEO = async (req, res) => {
    try {
        const seo = await SEO.find();
        res.status(200).json({ seo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editSEO = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, keywords, page } = req.body;
        const updatedSEO = await SEO.findByIdAndUpdate(
            id,
            { title, description, keywords: keywords || [], page },
            { new: true }
        );
        res.status(200).json({ seo: updatedSEO });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSEO = async (req, res) => {
    try {
        const { id } = req.params;
        await SEO.findByIdAndDelete(id);
        res.status(200).json({ message: 'SEO entry deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSEO, getAllSEO, editSEO, deleteSEO };