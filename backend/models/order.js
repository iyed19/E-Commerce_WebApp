const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    adresse: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    deliveryMethod: {
        type: String,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    cartTotal: {
        type: Number,
        required: true
    },
    items: {
        type: Object,
        required: true
    }
},{ strict: false });

const orderCollection = new mongoose.model("orders", orderSchema);

module.exports = orderCollection;