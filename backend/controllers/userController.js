const userCollection = require('../models/user');
const bcrypt = require("bcryptjs");


exports.login = async (req, res) => {
    try{
        const check = await userCollection.findOne({email: req.body.email});
        if(!check){
            return res.status(404).json({msg: "User email not found !"});
        }else{
            isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if(isPasswordMatch){
                return res.status(200).json({msg: "Success"});
            }else{
                return res.status(401).json({msg: "Email or Password or both of them are wrong !"});
            }
        }
    }catch(err){
        return res.status(500).json("error : ",err);
    }
}

exports.signUp = async (req, res) => {
    try {
        const existingUser = await userCollection.findOne({email: req.body.email});
        if(existingUser){
            return res.status(409).json({ msg: "User already exists, please choose a different email" });
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await userCollection.create({ ...req.body, password: hashedPassword });
            return res.status(201).json({ msg: "User created successfully", user });
        }
    } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key error code
            return res.status(409).json({ msg: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Error creating user' });
    }
}