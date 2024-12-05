const orderCollection = require('../models/order');


exports.addOrder = async (req, res) => {
    //console.log("Received data :", req.body);

    const orderData = {
        adresse: req.body.adresse,
        city: req.body.city,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        deliveryMethod: req.body.deliveryMethod,
        totalItems: req.body.totalItems,
        cartTotal: req.body.cartTotal,
        items: req.body.items
    }

    try{
        const insertedOrder = await orderCollection.insertMany(orderData);
        return res.status(200).json({msg: "Order sent successfully!"});
    }catch(err){
        return res.status(500).json({msg: "error"}, err);
    }
}