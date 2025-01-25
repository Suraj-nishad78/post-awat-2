
import * as friendRepo from "./friend.repository.js"
import {findOneUser} from "../users/user.repository.js"
import {customErrorHandler} from "../../middleware/errorHandler.middleware.js"

const getUserFriends = async (req, res, next) =>{
    try{
        const {userId } = req.params;
        const friends = await friendRepo.getFriends(userId)
        if(!friends.length){
            throw new customErrorHandler(404, "You don't have any friends!")
        }
        
        res.status(200).json({
            status:"Success",
            friends
        })

    } catch(err){
        next(err)
    }
}

const getfriendRequests = async (req, res, next) =>{
    try{
        const userId = req.user._id;
        const requests = await friendRepo.pendingRequests(userId)
        if(!requests.length){
            throw new customErrorHandler(404, "You don't have any friend requests!")
        }
        
        res.status(200).json({
            status:"Success",
            "Friend Requests":requests
        })
    } catch(err){
        next(err)
    }
}

const toggleFriendship = async (req, res, next) =>{
    try{
        const {friendId} = req.params;
        const userId = req.user._id;

        const checkFriendId = await findOneUser(friendId)
        
        if(!checkFriendId){
            throw new customErrorHandler(404, "Given ID doesn't exist in the system.")
        }
        
        const unFriend = await friendRepo.toggleFriendship(userId, friendId)
        
        if(!unFriend){
            
            if(userId === friendId){
                throw new customErrorHandler(404, `This Id: ${userId} belongs to you. please use diffrent one.`)
            }

            const requestSend = await friendRepo.sendRequest(userId, friendId)
            if(!requestSend){
                throw new customErrorHandler(404, "Something went wrong. While sendinf request.")
            }
            return  res.status(200).json({
                status:"Success",
                msg:"Friend Request send succesfully!"
            })
        }

        res.status(200).json({
            status:"Success",
            msg:`You have unfriend this friend ID : ${friendId}`
        })

    } catch(err){
        next(err)
    }
}

const responseToRequest = async (req, res, next) =>{
    try{
        const {friendId} = req.params;
        const userId = req.user._id;
        const {response} = req.query;
        const checkFriendId = await friendRepo.findRequest(friendId)
        
        if(!checkFriendId){
            throw new customErrorHandler(404, "Given ID doesn't exist in the system.")
        }
        
        if(!response || (response.toLowerCase() !== "accept" && response.toLowerCase() !== "reject")){
            throw new customErrorHandler(404, "Please input only 'accept' or 'reject' as a value in the query.")
        }
        
        if(response.toLowerCase() === "reject"){
            const requestRejected = await friendRepo.requestReject(userId, friendId)
            if(!requestRejected){
                throw new customErrorHandler(404, "Something went wrong. while rejecting a request.")
            }
            return res.status(200).json({
                status:"Success",
                msg:"Request rejected successfully!"
            })
        }

        const accept = await friendRepo.requestAccept(userId, friendId)
        
        if(!accept){
            throw new customErrorHandler(404, "Something went wrong. while accepting a request.")
        }

        res.status(200).json({
            status:"Success",
            msg:"Request accepted successfully!"
        })

    } catch(err){
        next(err)
    }
}

export {getUserFriends, getfriendRequests, toggleFriendship, responseToRequest}