const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    codePostal: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
});

const userCollection = new mongoose.model("users", userSchema);

module.exports = userCollection;