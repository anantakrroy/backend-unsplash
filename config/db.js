import { MongoClient } from "mongodb";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const client = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => new Error("Unable to connect to database ..."));

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

export default database;