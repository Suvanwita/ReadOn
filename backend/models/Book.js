const mongoose=require('mongoose')

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String
    },
    coverImage:{
        type:String
    }
},{timestamps:true});

module.exports=mongoose.model("Book",bookSchema);