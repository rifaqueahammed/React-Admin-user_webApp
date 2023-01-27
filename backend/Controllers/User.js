const bcrypt = require("bcrypt");
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require("mongoose");



module.exports = {
    userSignUp:(req,res)=>{
        try{
            const userData = req.body;
            User.findOne({
                $or: [
                  { email: userData.email },
                  { phone: userData.phone },
                ],
              }).then(async (result) => {
                if (result) {
                  res.json({ error: "User Already Exist" });
                } 
                else{
                    const salt = await bcrypt.genSalt(10);
                    // now we set user password to hashed password
                    userData.password = await bcrypt.hash(userData.password, salt);
                    const newUser = new User({
                      username: userData.username,
                      email: userData.email,
                      phone: userData.phone,
                      password: userData.password,
                    });
                    newUser.save().then(() => {
                      res.json({success:true});
                    });
                }
            })
        }
        catch{
            console.log('errror');
        }
    },

    userLogin:async(req,res)=>{
        try{
         const user = await User.findOne({ email: req.body.email });
        if (user) {
              const validPassword = await bcrypt.compare(
              req.body.password,
              user.password);

        if (validPassword) {
            if (user.isBlocked) {
             res.json({error:"User is Blocked"});
            } else {
              const payLoad = {
                id: user._id,
                email: user.email,
                username: user.username,
                phone:user.phone
              }
              const jwtSecretKey = process.env.JWT_SECRET_KEY;
              const token = jwt.sign(payLoad,jwtSecretKey,{ expiresIn: 86400 });
              res.json({auth:true,token:token,id:payLoad.id,payLoad});
           }
       } else {
          res.json({error:"Wrong password"});
      }
      } else {
        res.json({error:"Invalid email"});
      }
        }catch{
            console.log('error');
        }
    },

    userDetailes:(req,res)=>{
      try{
        const userId = mongoose.Types.ObjectId(req.body.userId);
        User.findOne({_id:userId}).then((result)=>{
          res.json(result);
        })
      }catch{
        console.log('error');
      }
    }
}