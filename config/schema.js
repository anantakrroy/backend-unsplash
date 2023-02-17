import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
    username: { type: String, required: "Required username" },
    password: { type: String, required: "Required password" },
    email: { type: String, required: "Required email", unique: [true, "Email already taken"] },
    timestamp: { type: Number, required: "Required timestamp" }
})

export const favoritePhotosSchema = new Schema({
    user: Number,
    url: String,
    description: String,
    username: String
})
