import {BSON}  from 'bson'
import {getDatabase}  from '../../database/mongoDb.js'

const db = getDatabase();

const getUsers = async () =>{
    try{
        const users = await db.collection('users').find({}, {projection:{password:0}}).toArray();
        return users;
    } catch (error){
        console.log("Error while getting users: ", error);
    }
}

const signup = async (newUser) =>{
    try{
        const user = await db.collection('users').insertOne(newUser)
        return user
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}

const signin = async (email) =>{
    try{
        const user = await db.collection('users').findOne({email})
        return user;
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}

const findOneUser = async (userId) =>{
    try{
        const _id = new BSON.ObjectId(userId);
        // const user = await db.collection('users').findOne({_id}, {projection:{password:0}})
        const user = await db.collection('users').findOne({_id})
        return user;
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}

const updateDetails = async(userId, updatedata) =>{
    try{
        const _id = new BSON.ObjectId(userId);
        const user = await db.collection('users').updateOne({_id}, {$set: updatedata})
        return user;
    } catch (err){
        console.log("Error while Signup: ", err);
    }
}


export {signup, signin, getUsers, findOneUser, updateDetails}



