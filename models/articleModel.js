const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    category: { type: String, default: 'General' },
    heading: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);
module.exports = { Article };
