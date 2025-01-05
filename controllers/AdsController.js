const { Ads } = require('../models/AdsModel');

const createSpace = async (req, res) => {
    const { header, footer, left, right, isApplied } = req.body;
    const newSpace = new Ads({ header, footer, left, right, isApplied });
    await newSpace.save();
    res.status(201).json({ message: 'space created successfully', ads: newSpace });
}


const getSpace = async (req, res) => {
    const spaces = await Ads.find();
    res.status(200).json({ ads: spaces });
}

const updateSpace = async (req, res) => {
    const { id } = req.params;
    const { isApplied } = req.body;

    try {
        const updatedSpace = await Ads.findByIdAndUpdate(
            id,
            { isApplied },
            { new: true }
        );
        if (!updatedSpace) {
            return res.status(404).json({ message: 'Ad not found' });
        }
        res.status(200).json({ message: 'Ad updated successfully', ads: updatedSpace });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ad', error: error.message });
    }
};

const deleteSpace = async (req, res) => {
    const { id } = req.params;
    const updatedSpace = await Ads.findByIdAndDelete(id);
    res.status(200).json({ message: 'space deleted successfully', ads: updatedSpace });
}

module.exports = {
    createSpace,
    updateSpace,
    getSpace,
    deleteSpace
}
