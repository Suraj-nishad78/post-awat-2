
import {allLikes, likeById, toggleLikePost} from "./like.repository.js"
import {postById} from "../../features/posts/post.repository.js"
import {customErrorHandler} from "../../middleware/errorHandler.middleware.js"


const getLikedPostById = async (req, res, next) =>{
    try{
        const {postId} = req.params;
        const likedPost = await likeById(postId);
        if(!likedPost.length){
            throw new customErrorHandler(404, `No liked post was found for the post ID: ${postId}.`)
        }

        const gettingPost = await postById(postId);
        
        const post = {
            ...gettingPost._doc,
            TotalLikes: likedPost.length
        }

        res.status(200).json({
            status:"Success",
            msg:`Like post`,
            post
        })
    } catch (err){
        next(err)
    }
}

const toggleLike = async (req, res, next) =>{
    try{
        const {postId} = req.params;
        let userId = req.user._id;
    
        const checkPostExist = await postById(postId);
    
        if(!checkPostExist){
            throw new customErrorHandler(404, `The post with ID ${postId} does not exist in the system.`)
        }
        
        const likePost = await toggleLikePost(userId, postId)
        
        if(!likePost){
            throw new customErrorHandler(200, `Like remove from this Post ID : ${postId}!`)
        }
    
        return res.status(201).json({
            status:"Success",
            msg:`You have liked the Post!`,
            likeDetails:likePost
        })
    }
    catch(err){
        next(err)
    }
    
}

export { getLikedPostById, toggleLike}









