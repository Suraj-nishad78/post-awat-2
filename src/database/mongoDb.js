import {MongoClient}  from 'mongodb'
import dotenv  from 'dotenv'
dotenv.config()

const mongoServer = process.env.MONGOSERVER;
const client = new MongoClient(mongoServer);
const dbName = "Chat_App"

const connectDatabase = async () =>{
    try{
        await client.connect();
        console.log('Database connected ✅')
    } catch(error) {
        console.log('Error while connecting database: ', error)
    }
}

const getDatabase = () =>{
    const db = client.db(dbName)
    return db;
}

export {connectDatabase, getDatabase}
