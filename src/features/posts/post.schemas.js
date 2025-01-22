
import mongoose from "mongoose";

 const postSchema = new mongoose.Schema({
    userId:{
        type:String,
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