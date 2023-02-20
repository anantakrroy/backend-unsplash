import { favoritePhotosSchema, userSchema } from "../config/schema.js";
import mongoose from "mongoose";
import database from "../config/db.js";

const favPhotosModel = mongoose.model('Favorites', favoritePhotosSchema, "favoritePhotos");
const userModel = mongoose.model('User', userSchema, "users");


export const addFavorites = async (photo, username) => {
    try {
        // console.log(`Photo to be added to fav ---> ${Object.entries(photo)} for the user ----> ${username}......`);
        const favPhoto = new favPhotosModel(photo);
        const userExists = await userModel.findOne({ username: username }) || null;
        const favExists = await favPhotosModel.findOne({ url: photo.url }) || null;
        console.log('Is photo already fav ? ---->', favExists)
        if (userExists) {
            if (!favExists)
                await favPhoto.save();
            else
                throw {
                    "message": "Already favorited !",
                    "name": "ReferenceError"
                }
        } else {
            throw {
                "name" : "ReferenceError",
                "message" : "No user found !",
                "statusCode" : 400
            }
        }
    } catch (error) {
        console.log(`favorite add model error ----> ${error}`);
        throw error;
    }
}    