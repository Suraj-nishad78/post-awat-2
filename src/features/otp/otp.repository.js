

import mongoose from 'mongoose';
import {otpSchema} from "./otp.schema.js"
import {UserModel} from "../../features/users/user.repository.js"

const OtpModel = mongoose.model("Otp", otpSchema)

const otpCreated = async(userId, otp) =>{
    try{
        const otpObj = {userId, otp}
        await OtpModel.deleteMany({userId})
        const otpVar = await OtpModel.create(otpObj)
        autoDeleteOtp(otpVar._id)  
        return otpVar;
    } catch (err){
        console.log("Erro while creating otp: ", err)
    }
}

let timerId;
const autoDeleteOtp =  (id) =>{
    const _id = id
    timerId = setTimeout( async ()=>{
        await OtpModel.findByIdAndDelete({_id})
    }, 5 * 60 * 1000)
}

const checkOtp = async (userId) =>{
    try{
        const otpDoc = await OtpModel.findOne({userId})
         await OtpModel.deleteOne({userId})
        clearTimeout(timerId)
        return otpDoc;
    } catch(err){
        console.log("Erro while checking otp: ", err)
    }
}

const updatePassword = async(userId, password) =>{
    try{
        const _id = userId;
        const user = await UserModel.findByIdAndUpdate({_id}, {password})
        return user.acknowledged;
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}


export { otpCreated, checkOtp, updatePassword}