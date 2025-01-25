
import mongoose from "mongoose";

import {friendSchema, requestSchema} from "./friend.schema.js" 

const FriendsModel = mongoose.model("Friend", friendSchema)
const RequestModel = mongoose.model("Request", requestSchema)

const getFriends = async (userId) =>{
    try{
        const friends = await FriendsModel.find({userId}).populate({path:"friendId", select:"-password"});
        return friends;
    } catch(err){
        console.log("Error while getting users friends: ", err)
    }
}

const pendingRequests = async (userId) =>{
    try{
        const requests = await RequestModel.find({userId}).populate({path:"friendId", select:"-password"});
        return requests;
    } catch (err){
        console.log("Error while getting requests: ", err);
    }
}

const toggleFriendship = async(userId, friendId) =>{
    try{
        const unFriend = await FriendsModel.deleteOne({userId, friendId})
        return unFriend.deletedCount;
    } catch (err){
        console.log("Error while toggling friendship: ", err);
    }
}

const sendRequest = async(userId, friendId) =>{
    try{
        await RequestModel.deleteOne({userId, friendId})
        const friendRequest = await RequestModel.create({userId, friendId})
        return friendRequest;
    } catch (err){
        console.log("Error while sending request: ", err);
    }
}

const requestAccept = async(userId, friendId) =>{
    try{
        const requestAccept = await RequestModel.deleteOne({userId, friendId})
        if(!requestAccept){
            return false;
        }
        await FriendsModel.deleteMany({
            $or:[
                {userId, friendId},
                {userId:friendId, friendId:userId}
            ]
        })
        const friendAdded = await FriendsModel.create([{userId, friendId},{userId:friendId, friendId:userId}])
        return friendAdded;
    } catch (err){
        console.log("Error while acceping request: ", err)
    }
}

const requestReject = async (userId, friendId) =>{
    try{
        const requestReject = await RequestModel.deleteOne({userId, friendId});
        return requestReject;
    }catch(err){
        console.log("Error while rejecting request: ", err)
    }
}

const findFriend = async(friendId) =>{
    try{
        const friend = await FriendsModel.findOne({friendId});
        return friend;
    } catch(err){
        console.log("Error while finding friend: ", err);
    }
}

const findRequest = async(friendId) =>{
    try{
        const request = await RequestModel.findOne({friendId});
        return request;
    } catch (err){
        console.log("Error while finding request: ", err);
    }
}

export {getFriends, pendingRequests, sendRequest, toggleFriendship, requestAccept, requestReject, findFriend, findRequest}