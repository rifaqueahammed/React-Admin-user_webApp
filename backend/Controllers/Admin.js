const Admin = require('../Model/Admin');
const User = require('../Model/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();




module.exports = {
    adminLogin:async(req,res)=>{
        try{
            const adminData = req.body;
            const AdminDetails = await Admin.findOne({$and:[{email:req.body.email},{password:req.body.password}]});
            if(AdminDetails != null ){
                const payLoad = {
                    id: AdminDetails._id,
                    email: AdminDetails.email,
                    username: AdminDetails.username,
                  }
                  const jwtSecretKey = process.env.JWT_SECRET_KEY;
                  const token = jwt.sign(payLoad,jwtSecretKey,{ expiresIn: 86400 });
                  res.json({auth:true,token:token,id:payLoad.id});
            }else{
                res.json({error:'Enter Correct Details'})
            }
        }catch{
          console.log('error');
        }
    },
    adminHome:(req,res)=>{
        try{
            User.find().then((result)=>{
                res.json(result);
            })
        }catch{
          console.log('error');
        }
    },

    blockUser:(req,res)=>{
        try{
           const userId = req.body.id;
            User.updateOne({_id:userId},{$set:{isBlocked:true}}).then(()=>{
                res.json({success:true});
            })
        }catch{
          console.log('error');
        }
    },
    unblockUser:(req,res)=>{
        try{
           const userId = req.body.id;
            User.updateOne({_id:userId},{$set:{isBlocked:false}}).then(()=>{
                res.json({success:true});
            })
        }catch{
          console.log('error');
        }
    },
    userAdd:(req,res)=>{
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
                        User.find().then((result)=>{
                            console.log(result)
                            res.json(result);
                        })
                    });
                }
            })
        }
        catch{
            console.log('errror');
        }
    },
    userEdit:(req,res)=>{
        try{
            const userData =req.body;
            User.updateOne({_id:userData.currentUserId},{$set:{
                username:userData.usernameEdit,
                email:userData.emailEdit,
                phone:userData.phoneEdit
            }}).then((result)=>{
                User.find().then((result)=>{
                    res.json(result);
                });
            });
        }catch{
            console.log('error');
        }
    }
  }