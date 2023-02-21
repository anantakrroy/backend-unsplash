//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import express from "express";
import { addFavorites, getFavoritePhotos, removeFavoritePhoto } from "../models/favoritePhotoModel.js";



// Add to favorites collection
export const addToFavorites = asyncHandler(async (req, res, next) => {
    console.log("Add to favs controller called ......");
    const username = req.params.username;
    const favPhoto = req.body;
    const data = await addFavorites(favPhoto, username);
    res.status(200).json({
        "message" : "Photo added to favorites !",
        "collection" : data
    });
})

// Get favorites
export const getFavorites = asyncHandler(async(req, res, next) => {
    const username = req.params.username;
    const favPhotos = await getFavoritePhotos(username);
    res.status(200).send(favPhotos);
})

// Remove from favorites
export const removeFavorite = asyncHandler(async (req,res, next) => {
    const photo = req.body;
    const toDelete = await removeFavoritePhoto(photo);
    res.status(200).json(toDelete);
})
