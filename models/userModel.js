import { userSchema } from "../config/schema.js";
import database from "../config/db.js";
import mongoose from "mongoose";

const UserModel = mongoose.model('User', userSchema, "users");

//  Register model
export const register = async (user) => {
    try {
        const newUser = new UserModel({...user, timestamp: Date.now()});
        return await newUser.save();
    } catch (error) {
        throw new Error(JSON.stringify(error));
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
        throw new Error(error);
    }
}