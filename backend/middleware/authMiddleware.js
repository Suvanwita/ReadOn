const jwt=require('jsonwebtoken')
const {User}=require("../models/User")

const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user=await User.findById(decoded.id).select("-password")
            if(!req.user)
                return res.status(401).json({message:"User not found"})
            next()
        }
        catch(err){
            return res.status(401).json({message:"Not authorized, invalid token"})
        }
    }

    if(!token)
        return res.status(401).json({message:"Not authorized, no token"})
}

const admin=async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(403).json({message:"Not admin"})
    }
}

module.exports={protect,admin}