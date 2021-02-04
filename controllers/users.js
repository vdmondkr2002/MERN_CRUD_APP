const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')


exports.signUp = async(req,res)=>{
    const {email,firstName,lastName,password,confirmPassword} = req.body

    console.log(req.body)
    try {
        const existingUser = await User.findOne({email:email})

        if(existingUser)
            return res.status(400).json({msg:"User already exists"})
        
        if(password !== confirmPassword)
            return res.status(400).json({msg:"Password don't match"})
        
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({email:email,password:hashedPassword,name:`${firstName} ${lastName}`})
        
        const payload = {
            email:newUser.email,
            id:newUser._id
        }

        const token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"1h"})

        return res.status(200).json({profile:newUser,token:token})
    } catch (err) {
        return res.status(500).json({msg:"Something went wrong.."})
    }
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log("ehls")
    try {
      const oldUser = await User.findOne({ email });
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ profile: oldUser, id: oldUser._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  
      return res.status(200).json({ profile: oldUser, token });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  