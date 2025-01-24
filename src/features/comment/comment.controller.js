
import {allCommnets, 
        commentsByPId,
        postComment,
        updateComment,
        deleteComment,
        checkCommentExist,
        checkCommentOwner
      } from "./comment.repository.js"
import {postById} from "../../features/posts/post.repository.js"      
import {customErrorHandler} from "../../middleware/errorHandler.middleware.js"


const getCommentByPid = async (req, res, next) =>{
    try{

        const {pId} = req.params;
        const postId = pId;
        const comments = await commentsByPId(postId)
        const comment = comments.map(com => com.content)
    
        if(!comments.length){
            throw new customErrorHandler(404, `No comment found with given Post Id: ${postId}`)
        }


        const getPost = await postById(postId)
        
        const post = {
            ...getPost._doc,
            "Post Comments": comment
        }
    
        res.status(200).json(post)
    }catch(err){
        next(err)
    }

}

const postCommentById = async (req, res, next) =>{
    try{
        const {pId} = req.params;
        const postId = pId;
        const userId = req.user._id;
        const {content} = req.body;

        if(!content) {
            throw new customErrorHandler(400, "Missing required fields: content!")
        }

        const comment = {userId, postId, content}

        const checkPostId = await postById(postId)

        if(!checkPostId){
            throw new customErrorHandler(404, `The post with ID ${postId} does not exist in the system.`)
        }
        const commented = await postComment(comment)

        if(!commented){
            throw new customErrorHandler(400, "Something went wrong! Please try again.")
        }

        res.status(201).json({
            status:"Success",
            msg:"Commented Successfully!",
            comment:commented
        })
    }catch(err){
        next(err)
    }
    
}

const updateCommentById = async (req, res, next) =>{
    try{
        const{id} = req.params;
        const userId = req.user._id;
        const {content} = req.body;
        
        const checkComment = await checkCommentExist(id)

        if(!checkComment){  
            throw new customErrorHandler(404, `The comment with ID does not exist in the system.`)
        }

        const checkUser = await checkCommentOwner(id, userId)
        
        if(!checkUser){
            throw new customErrorHandler(400, `You are not allowed to Update the comment`)
        }
        
        const commentUpdate = await updateComment(id, content)
        
        if(!commentUpdate){
            throw new customErrorHandler(400, "Something went wrong! Please try again.")
        }
        
        res.status(200).json({
            status:"Success",
            msg:"Comment Updated Successfully!",
            updatedComment:commentUpdate
        })
        
    } catch(err){
        next(err)
    }
}

const deleteCommentById = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const userId = req.user._id;
        const checkComment = await checkCommentExist(id)
        
        if(!checkComment){  
            throw new customErrorHandler(400, `The comment with ID ${id} does not exist in the system.`)
        }
        
        const checkUser = await checkCommentOwner(id, userId)
    
        if(!checkUser){
            throw new customErrorHandler(400, `You are not allowed to Delete the comment`)
        }
    
        const commentDeleted = await deleteComment(id)
    
        res.status(200).json({
            status:"Success",
            msg:"Comment deleted Successfully!",
            deletedComment:commentDeleted
        })
    } catch (err){
        next(err)
    }
}

export {getCommentByPid, 
        postCommentById,
        updateCommentById,
        deleteCommentById
    }