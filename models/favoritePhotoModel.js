// import { favoritePhotosSchema, userSchema } from "../config/schema.js";
import { UserModel } from "./userModel.js";
import mongoose, { mongo } from "mongoose";
import database from "../config/db.js";
import { all } from "axios";
const { Schema } = mongoose;


// Favoritephoto schema
export const favoritePhotosSchema = new Schema({
    user: { type: String, required: "Required user id" },
    url: { type: String, required: "Required photo raw url" },
    description: { type: String },
    username: { type: String, required: "Required unsplash username of photo uploader" },
    explanation: { type: String }
})


export const favPhotosModel = mongoose.models.Favorites || mongoose.model('Favorites', favoritePhotosSchema, "favoritePhotos");

// Add to favorite model
export const addFavorites = async (photo, username) => {
    try {
        // console.log(`Photo to be added to fav ---> ${Object.entries(photo)} for the user ----> ${username}......`);
        const favPhoto = new favPhotosModel(photo);
        const userExists = await UserModel.findOne({ username: username }) || null;
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
                "name": "ReferenceError",
                "message": "No user found !",
                "statusCode": 400
            }
        }
    } catch (error) {
        console.log(`favorite add model error ----> ${error}`);
        throw error;
    }
}

//  Get favorites model
export const getFavoritePhotos = async (username) => {
    console.log('get favorites called......');
    try {
        // Find the user in users to get user ID
        const getUser = await UserModel.findOne({ username: username });
        const userId = getUser._id;
        // Find the favorites for the user ID from favoritePhotos
        const allFavs = await favPhotosModel.find({ user: userId });
        return allFavs;
    } catch (error) {
        throw new Error(error);
    }
}

// Remove from favorites
export const removeFavoritePhoto = async (photo) => {
    try {
        const photoId = photo._id.$oid
        await favPhotosModel.remove({ _id: mongoose.Types.ObjectId(photoId) });
        return {
            "message": `Photo with id ${photoId} removed from favorites`
        }
    } catch (error) {
        throw error;
    }

}

export const editPhotoDescription = async (id, description, explanation) => {
    console.log("edit description model called.....");
    try {
        await favPhotosModel.findOneAndUpdate({ id: mongoose.Types.ObjectId(id) }, {
            "description": description,
            "explanation": explanation
        }, { new: true });
    } catch (error) {
        throw error;
    }
}