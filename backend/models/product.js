const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    ratingRate: {
        type: Number,
        required: true,
        default: 0
    },
    ratingCount: {
        type: Number,
        required: true,
        default: 0
    }
}, {strict: false});

const productCollection = new mongoose.model("products", productSchema);

module.exports = productCollection;