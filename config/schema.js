import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
    username: { type: String, required: "Required username" },
    password: { type: String, required: "Required password" },
    email: { type: String, required: "Required email", unique: [true, "Email already taken"] },
    timestamp: { type: Number, required: "Required timestamp" }
})

export const favoritePhotosSchema = new Schema({
    user: {type: String, required: "Required user id"},
    url: {type: String, required: "Required photo raw url"},
    description: {type: String},
    username: {type: String, required: "Required unsplash username of photo uploader"},
    explanation: {type: String}
})
