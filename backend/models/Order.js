const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    books:[
        {
            book:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Book'
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Shipped","Delivered"],
        default:"Pending"
    }
},{timestamps:true});

module.exports=mongoose.model("Order",orderSchema)