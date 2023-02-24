// import { userSchema } from "../config/schema.js";
import mongoose from "mongoose";
import database from "../config/db.js";
const { Schema } = mongoose;

// User schema
export const userSchema = new Schema({
    username: { type: String, required: "Required username" },
    password: { type: String, required: "Required password" },
    email: { type: String, required: "Required email", unique: [true, "Email already taken"] },
    timestamp: { type: Number, required: "Required timestamp" }
})


export const UserModel = mongoose.models.User || mongoose.model('User', userSchema, "users");

//  Register model
export const register = async (user) => {
    try {
        const newUser = new UserModel({...user, timestamp: Date.now()});
        return await newUser.save();
    } catch (error) {
        throw error;
    }
}

// Login model
export const login = async(user) => {
    console.log('user login model called........')
    try {
        // const query = await UserModel.where({username: user.email});
        const findUser = await UserModel.findOne({email: user.email});
        return findUser;
    } catch (error) {
        throw error;
    }
}