const User =  require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRound = 10;
const secretKey = 'Vai@123'

const signup = async (req,res) =>{
      
    let {email,password} = req.body;
    try{
      let existUser = await User.findOne({email:email})
      if(existUser)
      return  res.status(400).json({message:'User already exist'});
      let hashPassword = await bcrypt.hash(password,saltRound)
      let response = await User.create({email:email,password:hashPassword})
      return res.status(201).json({message:'User created successfully'})
    }catch(err){
        res.status(500).json({message:'Server Error'})
    }
}

const login = async (req,res) =>{
   
    let {email,password} = req.body;
    console.log('login',email,password)
    try{
      let existUser = await User.findOne({email:email})
      console.log('login user',existUser)
      if(!existUser)
      return  res.status(400).json({message:'User not found'});
      let matchPassword = await bcrypt.compare(password,existUser.password)
      console.log('passs match',matchPassword)
      if(!matchPassword)
      return  res.status(400).json({message:'Incorrect password'});
       
      const genrateToken =  (payload) =>  jwt.sign(payload,secretKey,{ expiresIn: '1h' }) 
      return res.status(200).json({message:'Login successfull',token:genrateToken({email:existUser.email})})
    }catch(err){
        res.status(500).json({message:'Server Error'})
    }
}

module.exports = {signup,login}