const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/user");


module.exports = (req,res,next)=>{
       const { authorization } = req.headers;
       //authorization === Bearer sfafsafa
       if(!authorization){
           return res.status(401).send({error:"you must be logged in"})
       }
       const token = authorization.replace("Bearer ","");
       jwt.verify(token,process.env.SECRET,async (err,payload)=>{
           if(err){
             return  res.status(401).send({error:"you must be logged in 2"})
           }
        console.log(payload)
        const {_id} = payload;
        const user = await User.findById(_id)
        req.user=user;
        next();
       })
}