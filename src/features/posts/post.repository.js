

import mongoose from 'mongoose';
import  postSchema  from "./post.schemas.js"

const PostModel = mongoose.model('Post', postSchema)

const postsAll = async () =>{
    try{
        const posts = await PostModel.find().populate({path:"userId", select:"-password -loggers"});
        return posts;
    } catch(err){
        console.log("Error while getting all posts: ", err)
    }
}

const postsForUsers = async (userId) =>{
    try{
        const posts = await PostModel.find({userId}).populate({path:"userId", select:"-password -loggers"});
        return posts;
    } catch(err){
        console.log("Error while getting users posts: ", err)
    }
}

const postById = async (postId) =>{
    try{
        const _id = postId;
        const post = await PostModel.findById({_id}).populate({path:"userId", select:"-password -loggers"})
        if(!post){
            return false
        }
        return post
    } catch(err){
        console.log("Error while getting post by id: ", err)
    }
}

const creatingPost = async (newPost) =>{
    try{
        const post = await PostModel.create(newPost)
        return post;
    } catch(err){
        console.log("Error while posting: ", err)
    }
}

const updatingPost = async (postId, updatedData) =>{
    try{
        const _id = postId;
        const postUpdate = await PostModel.findByIdAndUpdate({_id}, updatedData)
        const post = await PostModel.findOne({_id})
        return post;
    } catch(err){
        console.log("Error while updating post: ", err)
    }
}

const deletingPost = async (postId) =>{
    try{
        const _id = postId;
        const post = await PostModel.findByIdAndDelete({_id})
        if(!post){
            return false
        }
        return post
    } catch(err){
        console.log("Error while deleting post: ", err)
    }
}

const checkPostOwner =  async (userId) =>{
    try{
        const checkOwner = await PostModel.findOne({userId})
        return checkOwner;
    }
    catch(err){
        console.log("Error while checking post owner: ", err)
    }
}

export {postsAll, postsForUsers, postById, creatingPost, updatingPost, deletingPost, checkPostOwner}