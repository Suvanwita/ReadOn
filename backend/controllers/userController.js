const {User}=require("../models/User")
const bcrypt=require("bcryptjs")

const getUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id).select("-password")
        if(!user)
            return res.status(404).json({message:"User profile not found"})
        res.json(user)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id).select("-password")
        if(!user)
            return res.status(404).json({message:"User profile not found"})

        user.name=req.body.name||user.name
        user.email=req.body.email||user.email

        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            user.password=await bcrypt.hash(req.body.password,salt)
        }

        await user.save()

        const updatedUser=user.toObject()
        delete updatedUser.password

        res.json(updatedUser)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={getUserProfile,updateUserProfile}