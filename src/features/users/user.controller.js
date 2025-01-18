
import jwt  from 'jsonwebtoken'
import bcrypt  from 'bcrypt'
import * as userRepo  from './user.repository.js'

import {customErrorHandler} from "../../middleware/errorHandler.middleware.js"

const signupUser = async (req, res, next) =>{
    try{
        const {name, email, password} = req.body;
        const encryptPassword = await bcrypt.hash(password, 10)
        const newUser = {name, email, password:encryptPassword};
        const user = await userRepo.signup(newUser)
        if(!user){
            throw new customErrorHandler(404, "User sign up failed. Please try again!")
        }
        
        res.status(201).json({
            status:"Success",
            msg:"User sign up successfully!",
            user
        })
        

    } catch (err){
        next(err)
    }
}

const loginUser = async (req, res, next) =>{
    try{
        const {email, password} = req.body;
        const user = await userRepo.signin(email)

        if(!user){
            throw new customErrorHandler(400, "Email doesn't exist.")
        }
        
        const checkPassword = await bcrypt.compare(password, user.password);
        
        if(!checkPassword){
            throw new customErrorHandler(400, "Invalid credentials!")
        }
        
        const token = jwt.sign(user,process.env.PRIVATE_KEY,{expiresIn:'10m'})

        res.cookie("jwtToken", token, {httpOnly:true, maxAge: 10 * 60 * 1000})
        .status(200)
        .json({
            status:"Success",
            msg:"User sign in successfully!",
            token
        })

    } catch (err){
        next(err)
    }

}

const logoutUser = (req, res, next) =>{
    try{
        const {jwtToken} = req.cookies;
    
        res
        .clearCookie('jwtToken')
        .status(200)
        .json({
            status:"Success",
            msg:"You are logout successfully!"
        })
        
    } catch(err){
        next(err)
    }
}

const allUsers = async (req, res, next) => {
    try{
        const users = await userRepo.getUsers()
        if(!users.length){
            throw new customErrorHandler(404, "No user found!")
        }
        res.status(200).json({
            status:"Success",
            users
        })
    } catch (err){
        next(err)
    }
}

const getUserDetails = async(req, res, next) =>{
    try{
        const {userId} = req.params;    
        const user = await userRepo.findOneUser(userId)
        if(!user){
            throw new customErrorHandler(404, "No user found!")
        }
        res.status(200).json({
            status:"Success",
            user
        })
    } catch (err){
        next(err)
    }
}

const updateUserDetails = async (req, res, next) =>{
    try{
        const ownerId = req.user._id;
        const {userId} = req.params;
        const {name, email} = req.body;
        const{ file} = req;
        const updatedData = {name, email, avatar:file.filename}

        if(ownerId !== userId){
            throw new customErrorHandler(400, "You are not allow to update this user details")
        }

        const user = await userRepo.updateDetails(userId, updatedData)

        if(!user){
            throw new customErrorHandler(400, "Fail to update user data!")
        }
        res.status(200).json({
            status:"Success",
            msg:"User updated successfully!",
            user
        })

    } catch(err){
        next(err)
    }

}

export {allUsers, loginUser, signupUser, logoutUser, getUserDetails, updateUserDetails}










