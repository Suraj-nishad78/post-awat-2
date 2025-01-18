
import {BSON}  from 'bson'
import {getDatabase}  from '../../database/mongoDb.js'

const db = getDatabase();

const postsAll = async () =>{
    try{
        const posts = await db.collection('posts').find().toArray();
        return posts;
    } catch(err){
        console.log("Error while getting all posts: ", err)
    }
}
const postsForUsers = async (userId) =>{
    try{
        const posts = await db.collection('posts').find({userId}).toArray();
        return posts;
    } catch(err){
        console.log("Error while getting users posts: ", err)
    }
}

const postById = async (postId) =>{
    try{
        const _id = new BSON.ObjectId(postId);
        const post = await db.collection('posts').findOne({_id})
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

        const post = await db.collection('posts').insertOne(newPost)
        return post;
    } catch(err){
        console.log("Error while posting: ", err)
    }
}

const updatingPost = async (postId, updatedData) =>{
    try{
        const _id = new BSON.ObjectId(postId);
        const post = await db.collection('posts').updateOne({_id},{$set: updatedData})
        return post;
    } catch(err){
        console.log("Error while updating post: ", err)
    }
}

const deletingPost = async (postId) =>{
    try{
        const _id = new BSON.ObjectId(postId);
        const post = await db.collection('posts').deleteOne({_id})
        if(!post){
            return false
        }
        return post
    } catch(err){
        console.log("Error while deleting post: ", err)
    }
}

export {postsAll, postsForUsers, postById, creatingPost, updatingPost, deletingPost}