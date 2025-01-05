const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adsSchema = new Schema(
    {
        header: { type: String, required: true },
        footer: { type: String, required: true },
        left: { type: String, required: true },
        right: { type: String, required: true },
        isApplied: { type: Boolean, default: false }
    },
    { timestamps: true }
);


const Ads = mongoose.model('Ads', adsSchema);
module.exports = { Ads };
