const express = require('express');
const {addProduct,getProducts,getProductById,deleteProduct,updateProduct,
    upload,getCategories} = require('../controllers/productController');

const router = express.Router();

router.route('/addProduct').post(upload, addProduct);
router.route('/getProducts').get(getProducts);
router.route('/getProductById/:id').get(getProductById);
router.route('/deleteProduct/:id').delete(deleteProduct);
router.route('/updateProduct/:id').put(upload, updateProduct);
router.route('/getCategories').get(getCategories);

module.exports = router;