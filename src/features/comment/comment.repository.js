
import mongoose from "mongoose";
import {commentSchema} from "./comment.schema.js"

const CommentModel = mongoose.model("Comment", commentSchema)

const allCommnets = async () =>{
    const comments = await CommentModel.find()
    return comments;
}

const commentsByPId = async(postId) =>{
    const comment = await CommentModel.find({postId})
    return comment;
}

const postComment = async (cmt) =>{
    const comment = await CommentModel.create(cmt)
    return comment;
}

const updateComment = async (_id, cmt) =>{
    try{
        const comment = await CommentModel.findByIdAndUpdate(_id, {content:cmt})
        const commentUpdate = await CommentModel.findById({_id})
        return commentUpdate;
    } catch(err){
        console.log("Error while updating comment: ", err);
    }
}

const deleteComment = async(_id) =>{
    const deletedComment = await CommentModel.findByIdAndDelete({_id}) 
    return deletedComment;
}

const checkCommentExist = async (_id) =>{
    try{
        const comment = await CommentModel.findById({_id})
        return comment;
    } catch(err){
        console.log("Error while check comment: ", err);
    }
}

const checkCommentOwner = async (_id, userId) =>{
    const comment = await CommentModel.findOne({_id, userId})
    return comment;
}

export {allCommnets, 
        commentsByPId,
        postComment,
        updateComment,
        deleteComment,
        checkCommentExist,
        checkCommentOwner
       }


