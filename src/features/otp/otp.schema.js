
import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
})