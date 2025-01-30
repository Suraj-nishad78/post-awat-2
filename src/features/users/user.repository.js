

import mongoose from 'mongoose';
import {userSchema} from "./user.schema.js"


export const UserModel = mongoose.model("User", userSchema)

const signup = async (newUser) =>{
   try{
       const user =  await UserModel.create(newUser)
       return user;
   } catch(err){
    console.log("Error while creating", err);
   }

}

const signin = async (email) =>{
    try{
        const user = await UserModel.findOne({email})
        return user;
    } catch (err){
        console.log("Error while Signin: ", err);
    }
}

const getUsers = async () =>{
   const users = await UserModel.find({}, {password:0, loggers:0})
   return users;
}

const findOneUser = async (userId) =>{
    try{
        const _id = userId;
        const user = await UserModel.findOne({_id})
        return user;
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}

const updateDetails = async(userId, updatedata) =>{
    try{
        const _id = userId;
        const userUpdate = await UserModel.findByIdAndUpdate(_id, updatedata)
        const user = await UserModel.findOne({_id})
        return user;
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}

const updateLoggerArray = async (_id, token) =>{
    try{
        await UserModel.findByIdAndUpdate(_id, {$push: {loggers: token}})
        const user = await UserModel.findById(_id)
        removeToken(_id, token)
        return user;
    } catch(err){
        console.log("Error while updating logger's array: ", err);
    }
}

const removeToken = (_id, token) =>{
    setTimeout( async()=>{
        await UserModel.findByIdAndUpdate(_id, {$pull: {loggers: token}})
    }, 10* 60 * 1000)
}


export {signup, signin, getUsers, findOneUser, updateDetails, updateLoggerArray}



