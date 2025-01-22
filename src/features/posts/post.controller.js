
import * as postRepo  from './post.repository.js'
import {customErrorHandler} from "../../middleware/errorHandler.middleware.js"

const allPosts = async (req, res, next) =>{
    try{
        const posts = await postRepo.postsAll();
        if(!posts.length){
            throw new customErrorHandler(404, "No post found!")
        }
        
        res.status(200).json({
            status:"Success",
            posts
        })
    } catch(err){
        next(err)
    }
    
}

const userPosts = async (req, res, next) =>{
    try{
        const userId = req.user._doc._id;
        const posts = await postRepo.postsForUsers(userId)

        if(!posts.length){
            throw new customErrorHandler(404, "No post found!")
        }
        
        res.status(200).json({
            status:"Success",
            name:req.user.name,
            posts
        })
        
    }catch(err){
        next(err)
    }
}
const getPostById = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const post = await postRepo.postById(id)
        if(!post){
            throw new customErrorHandler(404, "No post found!")
        }

        res.status(200).json({
            status:"Success",
            post
        })

    } catch(err){
        next(err)
    }
}
const createPost = async (req, res, next) =>{
    try{
        const {caption, imageUrl} = req.body;
        const{ file} = req;
        const userId = req.user._doc._id;
        const post = {
            userId, 
            caption, 
            imageUrl:file.filename
        }
        const posted = await postRepo.creatingPost(post)
    
        if(!posted){    
            throw new customErrorHandler(400, "Posting failed. Please try again!")
        }
        
        res.status(201).json({
            status:"Success",
            msg:"Posting successfully!"
        })

    } catch(err){
        next(err)
    }
}
const updatePostById = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const {caption, imageUrl} = req.body;
        const{ file} = req;
        const updatedData = {caption, imageUrl:file.filename}
        const userId = req.user._doc._id;

        const checkPostOwner = await postRepo.checkPostOwner(userId)

        if(!checkPostOwner){
            throw new customErrorHandler(400, "You are not allowed to update ths post!")
        }

        const post = await postRepo.updatingPost(id, updatedData)
        if(!post){
            throw new customErrorHandler(400, "Post updating failed!")
        }
        
        res.status(200).json({
            status:"Success",
            msg:"Post updated Successfully!"
        })

    }catch (err){
        next(err)
    }
}

const deletePostById = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const post = await postRepo.deletingPost(id)

        const userId = req.user._doc._id;
        const checkPostOwner = await postRepo.checkPostOwner(userId)

        if(!checkPostOwner){
            throw new customErrorHandler(400, "You are not allowed to delete this post!")
        }

        if(!post){
            throw new customErrorHandler(400, "No post found!")
        }

        res.status(200).json({
            status:"Success",
            msg:"Post deleted successfully!"
        })

    } catch(err){
        next(err)
    }
}

export {allPosts, userPosts, getPostById, createPost, updatePostById, deletePostById}