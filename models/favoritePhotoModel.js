import { favoritePhotosSchema } from "../config/schema.js";
import mongoose from "mongoose";
import database from "../config/db.js";

const favPhotosModel = mongoose.model('Favorites', favoritePhotosSchema, "favoritePhotos");

export const addFavorites = async (photo) => {
    try {
        console.log(`Photo to be added to fav ---> ${Object.entries(photo)}`);
        const favPhoto = new favPhotosModel(photo);
        const favExists = await favPhotosModel.findOne({url: photo.url}) || null;
        console.log('Is photo already fav ? ---->', favExists)
        if(!favExists)
            await favPhoto.save();
        else
            throw {
                "message": "Already favorited !",
                "name" : "ReferenceError"
            }
    } catch (error) {
        console.log(`favorite add model error ----> ${error}`);
        throw error;
    }
}    