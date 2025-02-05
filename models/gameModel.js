const mongoose = require('mongoose');




const gameSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    coreName: { type: String },
    gameURL: { type: String },
    embedScript: { type: String },
    imageURL: { type: String },
    imageFileURL: { type: String },
    category: { type: String },
    platform: { type: String },
    developer: { type: String },
    emulator: { type: String },
    popularity: { type: Number },
    heading: { type: String },
    content: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
