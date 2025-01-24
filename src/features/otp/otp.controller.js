import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import * as otpRepo from "./otp.repository.js"
import {customErrorHandler} from "../../middleware/errorHandler.middleware.js"

const otpSend = async (req, res, next) =>{
    try{
        const userId = req.user._id;
        const otpNum = req.otp;
        const otp = await bcrypt.hash(otpNum, 10)
        const otpCreation = await otpRepo.otpCreated(userId, otp);
        if(!otpCreation){
            throw new customErrorHandler(400, "Otp creation failed. Please try again!")
        }
        res.status(200).json({
            status:"Success",
            msg:"An OTP has been sent to your email address."
        })
    } catch (err){
        next(err)
    }
}


const otpVarify = async (req, res, next) =>{
    try {
        const {otp} = req.body;
        const userId = req.user._id;

        if(!otp){
            throw new customErrorHandler(400, "Please enter a otp!")
        }

        const otpdoc = await otpRepo.checkOtp(userId)
        if(!otpdoc){
            throw new customErrorHandler(400, "User authentication failed!")
        }
        
        const checkOtpAuth = await bcrypt.compare(otp, otpdoc.otp)
    
        if(!checkOtpAuth){
            throw new customErrorHandler(400, "The OTP entered is incorrect.")
        }
        
        let otpToken = jwt.sign({checkOtpAuth}, process.env.PRIVATE_KEY, {expiresIn:"5m"});

        res.cookie("otpVarified", otpToken, {httpOnly:true, maxAge: 5 * 60 * 1000})
        .status(200).json({
            status:"Success",
            msg:"OTP verified successfully."
        })
    } catch (err){
        next(err)
    }
}

const resetPassword = async (req, res, next) =>{
    try {

        const token = req.cookies?.otpVarified;
        const userId = req.user._id;
        const{ newPassowrd, confirmPassword} = req.body;

        if(!token){
            throw new customErrorHandler(400, "Please generate a new OTP for the password change request.")
        }

        const valid = jwt.verify(token, process.env.PRIVATE_KEY);

        if(!newPassowrd && ! confirmPassword){
            throw new customErrorHandler(400, "Please enter a required field: token, newPassword or confirmPassword.")
        }

        if(newPassowrd !==  confirmPassword ){
            throw new customErrorHandler(400, "New password & confirm password must be same.")
        }
        
        const password = await bcrypt.hash(newPassowrd, 10)
        const updatePass = otpRepo.updatePassword(userId, password)

        if(!updatePass){
            throw new customErrorHandler(400, "Password updation failed!")
        }

        res.clearCookie('otpVarified');

        res.status(200).json({
            status:"Success",
            msg:"Password updated succssfully."
        })

    } catch(err){
        next(err)
    }
}

 export {otpSend, otpVarify, resetPassword}









