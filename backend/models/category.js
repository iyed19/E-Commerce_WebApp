const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({}, { strict: false });

const categoryCollection = new mongoose.model('Category', categorySchema, 'categories');

module.exports = categoryCollection;