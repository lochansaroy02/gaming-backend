const mongoose = require('mongoose')

const seoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String },
    page: { type: String, required: true },
});


const SEO = mongoose.model('SEO', seoSchema)
module.exports = { SEO }