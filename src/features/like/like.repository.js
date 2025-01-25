
import mongoose from "mongoose";

import { likeSchema } from "./like.schema.js";

const LikeModel = mongoose.model("Like", likeSchema)

const allLikes = async () =>{
    const likes = await LikeModel.find()
    return likes
}

const likeById = async (postId) =>{
    const likedPost = await LikeModel.find({postId}).populate("postId").populate({
        path:"userId",
        select:"-password -gender"})
    return likedPost;
}

const toggleLikePost = async (userId, postId) =>{
    try{
        const newLike = { userId, postId}
        const likedExist = await LikeModel.findOne(newLike)
    
        if(likedExist){
            const like = await LikeModel.deleteOne(newLike)
            return false;
        } else {
            const like = (await LikeModel.create(newLike)).populate("postId")
            return like;
        }
    } catch(err){
        console.log("Error while liking the post: ", err)
    }
}

export {allLikes, likeById, toggleLikePost}