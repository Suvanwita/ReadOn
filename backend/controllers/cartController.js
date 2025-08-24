const {Book}=require("../models/Book")
const {Cart}=require("../models/Cart")

const addToCart=async(req,res)=>{
    try{
        const {bookId,quantity}=req.body

        let cart=await Cart.findOne({user:req.user._id})
        if(!cart)
            cart=new Cart({user:req.user._id,items:[]})

        let itemIndex=cart.items.findIndex(i=>i.book.toString()===bookId)
        if(itemIndex>-1){
            cart.items[itemIndex].quantity+=quantity||1;
        }else{
            cart.items.push({book:bookId,quantity:quantity||1});
        }

        await cart.save();
        res.json(cart);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getCart=async(req,res)=>{
    try{
        let cart=await Cart.findOne({user:req.user._id}).populate("items.book","title price")
        if(!cart)
            return res.json({items:[]})
        res.json(cart)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateCartItem=async(req,res)=>{
    try{
        const {bookId,quantity}=req.body
        let cart=await Cart.findOne({user:req.user._id})
        if(!cart)
            res.status(404).json({message:"Cart not found"})

        const itemIndex=cart.items.findIndex(i=>i.book.toString()===bookId)
        if(itemIndex==1)
            return res.status(404).json({message:"Book not in cart"})

        if(quantity<=0)
            cart.items.splice(itemIndex,1)
        else
            cart.items[itemIndex].quantity=quantity

        await cart.save()
        res.json(cart)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const removeFromCart=async(req,res)=>{
    try{
        const {bookId}=req.body
        let cart=await Cart.findOne({user:req.user._id})
        if(!cart)
            res.status(404).json({message:"Cart not found"})

        cart.items=cart.items.filter(i=>i.book.toString()!==bookId)

        await cart.save()
        res.json(cart)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const clearCart=async(req,res)=>{
    try{
        let cart=await Cart.findOne({user:req.user._id})
        if(!cart)
            res.status(404).json({message:"Cart not found"})

        cart.items=[]

        await cart.save()
        res.json({message:"Cart cleared"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={addToCart,getCart,updateCartItem,removeFromCart,clearCart}


