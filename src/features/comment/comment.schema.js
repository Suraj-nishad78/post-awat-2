
import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})