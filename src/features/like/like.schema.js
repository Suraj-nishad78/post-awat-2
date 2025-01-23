import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }    
})