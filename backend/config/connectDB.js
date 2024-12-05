const mongoose = require('mongoose');
const connect = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/e-commerce');
        console.log("Database connected successfully !")
    }catch(err){
        console.log(err)
    }
}

module.exports = connect;