//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import express from "express";
import { addFavorites } from "../models/favoritePhotoModel.js";



// Add to favorites collection
export const addToFavorites = asyncHandler(async (req, res, next) => {
    console.log("Add to favs controller called ......");
    const username = req.params.username;
    const userLoggingIn = req.data.username;
    if(username !== userLoggingIn) {
        throw {
            "name" : "AuthorizationError",
            "message" : "Unauthenticated user ! You can add photos to your own collection !",
            "statusCode" : 401
        }
    }
    const favPhoto = req.body;
    const data = await addFavorites(favPhoto, username);
    res.status(200).json({
        "message" : "Photo added to favorites !",
        "collection" : data
    });
})
