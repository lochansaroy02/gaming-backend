const { SEO } = require('../models/seoModel')



const createSEO = async (req, res) => {
    const { title, description, keywords, page } = req.body;

    try {
        const existingSEO = await SEO.findOne({ page });

        if (existingSEO) {
            existingSEO.title = title;
            existingSEO.description = description;
            existingSEO.keywords = keywords;

            const updatedSEO = await existingSEO.save();
            return res.status(200).json({ message: 'SEO entry updated successfully', seo: updatedSEO });
        } else {
            const newSEO = new SEO({
                title,
                description,
                keywords,
                page,
            });

            await newSEO.save();
            return res.status(201).json({ message: 'SEO entry created successfully', seo: newSEO });
        }
    } catch (error) {
        res.status(500).json({ message: "Error processing SEO entry.", error });
    }
};

const deleteSEO = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const deletedSEO = await SEO.findByIdAndDelete(id);

        if (!deletedSEO) {
            return res.status(404).json({ message: "SEO entry not found." });
        }

        res.status(200).json({ message: "SEO entry deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting SEO entry.", error });
    }
};

const editSEO = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, keywords, page } = req.body;

        const updatedSEO = await SEO.findByIdAndUpdate(
            id,
            { title, description, keywords, page },
            { new: true, runValidators: true }
        );

        if (!updatedSEO) {
            return res.status(404).json({ message: "SEO entry not found." });
        }

        res.status(200).json({ message: "SEO entry updated successfully.", seo: updatedSEO });
    } catch (error) {
        res.status(500).json({ message: "Error updating SEO entry.", error });
    }
};


const getAllSEO = async (req, res) => {
    try {
        const allSEO = await SEO.find(); // Fetch all SEO entries

        if (allSEO.length === 0) {
            return res.status(404).json({ message: "No SEO entries found." });
        }

        res.status(200).json({ seo: allSEO });
    } catch (error) {
        res.status(500).json({ message: "Error fetching SEO entries.", error });
    }
};

const getSEOById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const singleSEO = await SEO.findById(id);

        if (!singleSEO) {
            return res.status(404).json({ message: "SEO entry not found." });
        }

        res.status(200).json({ seo: singleSEO });
    } catch (error) {
        res.status(500).json({ message: "Error fetching SEO entry.", error });
    }
};



module.exports = {
    createSEO,
    deleteSEO,
    editSEO,
    getAllSEO,
    getSEOById,
};
