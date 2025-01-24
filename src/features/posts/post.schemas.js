
import mongoose from "mongoose";

 const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
    caption:{
        type:String,
        required:true
    }, 
    imageUrl:{
        type:String,
        required:true
    },
})

export default postSchema;