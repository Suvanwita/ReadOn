const {Order}=require("../models/Order")

const createOrder=async(req,res)=>{
    try{
        const {books,totalPrice}=req.body;

        if(!books||books.length===0){
            res.status(400).json({message:"No books provided"})
        }

        const order=new Order({
            user:req.user._id,
            books, 
            totalPrice
        })
        await order.save()
        res.status(201).json(order)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user._id}).populate("books.book","title price")
        res.status(201).json(orders)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
                                .populate("user","name email")
                                .populate("books.book", "title price")
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        if(order.user._id.toString()!==req.user._id.toString() && !req.user.isAdmin){
            return res.status(403).json({message:"Not authorized"});
        }
        res.json(order)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateStatus=async(req,res)=>{
    try{
        const {status}=req.body
        const order=await Order.findById(req.params.id)
        if(!order)
            return res.status(404).json("Order not found")

        order.status=status||order.status
        await order.save()

        res.json({message:"Order status updated", order})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={createOrder,getOrders,getOrder,updateStatus}