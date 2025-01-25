
import mongoose from "mongoose";

export const friendSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const requestSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    request:{
        type:String,
        default:"Pending"
    }
})