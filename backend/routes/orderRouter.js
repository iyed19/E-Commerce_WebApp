const express = require('express');
const {addOrder} = require('../controllers/orderController');

const router = express.Router();

router.route('/addOrder').post(addOrder);

module.exports = router;