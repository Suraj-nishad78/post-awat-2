

import {BSON}  from 'bson'
import {getDatabase}  from '../../database/mongoDb.js'

const db = getDatabase();

const otpCreated = async(userId, otp) =>{
    try{
        const otpObj = {userId, otp}
         await db.collection('OTPs').deleteMany({userId})
        const otpVar = await db.collection('OTPs').insertOne(otpObj)
        return otpVar.acknowledged;
    } catch (err){
        console.log("Erro while creating otp: ", err)
    }
}

const checkOtp = async (userId) =>{
    try{
        const otpDoc = await db.collection('OTPs').findOne({userId})
        return otpDoc;
    } catch(err){
        console.log("Erro while checking otp: ", err)
    }
}

const updatePassword = async(userId, password) =>{
    try{
        const _id = new BSON.ObjectId(userId);
        const user = await db.collection('users').updateOne({_id}, {$set: {password}})
        return user.acknowledged;
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}


export { otpCreated, checkOtp, updatePassword}