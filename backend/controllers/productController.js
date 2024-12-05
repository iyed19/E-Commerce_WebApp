const productCollection = require('../models/product');
const categoryCollection = require('../models/category');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 50 * 1024 * 1024,
        fieldSize: 10 * 1024 * 1024
     },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});
exports.upload = upload.single('image');


exports.addProduct = async (req, res) => {    
    const productData = {
        title: req.body.title.toUpperCase(),
        category: req.body.selectedCategory.toUpperCase(),
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.file.filename
    }

    const dynamicFields = { ...req.body };
        delete dynamicFields.title;
        delete dynamicFields.selectedCategory;
        delete dynamicFields.description;
        delete dynamicFields.quantity;
        delete dynamicFields.price;
        delete dynamicFields.image;

        const finalProductData = { ...productData, ...dynamicFields };

    try{
        const existingProduct = await productCollection.findOne({title: productData.title, category: productData.category});
        if(existingProduct){
            const existingQuantity = parseInt(existingProduct.quantity, 10);
            const newQuantity = parseInt(productData.quantity, 10);
            const updatedProduct = await productCollection.updateOne(
                {title: productData.title, category: productData.category},
                {$set: { quantity: existingQuantity + newQuantity}});
            return res.status(200).json({msg: "Product quantity updated successfully!"});
        }
        else{
            const insertedProduct = await productCollection.insertMany(finalProductData);
            return res.status(200).json({msg: "Product added successfully!"});
        }
    }catch(err){
        return res.status(500).json("error");
    }
}


exports.getProducts = async (req, res) => {
    try{
        const listProducts = await productCollection.find({}, {"__v": false});
        return res.status(200).json(listProducts);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }
};


exports.getProductById = async (req, res) => {
    try{
        const product = await productCollection.findById(req.params.id, {"__v": false});
        return res.status(200).json(product);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const existingProduct = await productCollection.findOne({ _id: req.params.id});
        if(existingProduct){
            const deleteProduct = await productCollection.deleteOne({ _id: req.params.id });
            return res.status(200).json({msg: 'Product deleted successfully!'});
        }
    } catch (err) {
        console.log(err);
    }
};


exports.updateProduct = async (req, res) => {
    const newProductData = {
        title: req.body.title.toUpperCase(),
        category: req.body.category.toUpperCase(),
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.file.filename
    }

    const selectedProductId  = req.params.id;

    try {
        const updatedProduct = await productCollection.updateOne(
            { _id: selectedProductId },
            { $set: newProductData }
        );
        return res.status(200).json({msg: 'Product updated successfully!'});
    } catch (err) {
        console.log(err);
    }    
}


exports.getCategories = async (req, res) => {
    try{
        const listCategories = await categoryCollection.find({}, {"__v": false});
        return res.status(200).json(listCategories);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }
};