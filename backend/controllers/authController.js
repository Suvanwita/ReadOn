const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body

        const existingUser=await User.findOne({email})
        if(existingUser)
            return res.json({message:"User already exists"})

        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashedPassword})

        res.status(201).json({message:"User registered successfully",user})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user)
            return res.status(400).json({message:"Invalid credentials"})

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({message:"Invalid credentials"})

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})

        res.json({message:"Login successful",token})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={register,login}