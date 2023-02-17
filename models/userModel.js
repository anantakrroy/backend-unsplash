import { userSchema } from "../config/schema.js";
import database from "../config/db.js";
import mongoose from "mongoose";

const UserModel = mongoose.model('User', userSchema, "users");

  

//  Register a new user
export const register = async (user) => {
    try {
        const newUser = new UserModel({...user, timestamp: Date.now()});
        // console.log(database.collections)
        return await newUser.save()
    } catch (error) {
        return error.errors;
    }
}