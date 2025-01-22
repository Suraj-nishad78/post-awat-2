import {MongoClient}  from 'mongodb'
import mongoose from 'mongoose';
import dotenv  from 'dotenv'
dotenv.config()

const mongoServer = process.env.MONGOSERVER;
const client = new MongoClient(mongoServer);
const dbName = "Chat_App"

const connectDatabase = async () =>{
    /*
    try{
        await client.connect();
        console.log('Database connected ✅')
    } catch(error) {
        console.log('Error while connecting database: ', error)
    }
    */
}

const getDatabase = () =>{
    /*
    const db = client.db(dbName)
    return db;
    */
}

const connectDBusingMongoose = async () =>{
    try{
        await mongoose.connect(mongoServer)
        console.log('Database connected ✅')
    } catch (err){
        console.log('Error while connecting database: ', err)
    }
}

export {connectDatabase, getDatabase, connectDBusingMongoose}
