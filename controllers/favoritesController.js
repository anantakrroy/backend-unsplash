//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import express from "express";
import { addFavorites } from "../models/favoritePhotoModel.js";



// Add to favorites collection
export const addToFavorites = asyncHandler(async (req, res, next) => {
    console.log("Add to favs controller called ......");
    const favPhoto = req.body;
    const data = await addFavorites(favPhoto);
    res.status(200).json({
        "message" : "Photo added to favorites !",
        "collection" : data
    });
})
