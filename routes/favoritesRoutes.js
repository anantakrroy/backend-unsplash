import express from "express";
import { addToFavorites, editDescription, getFavorites, removeFavorite } from "../controllers/favoritesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const favoriteRoutes = express.Router();

favoriteRoutes.post('/:username/add',authMiddleware, addToFavorites);
favoriteRoutes.get('/:username',authMiddleware, getFavorites);
favoriteRoutes.delete('/:username/delete',authMiddleware, removeFavorite);
favoriteRoutes.patch('/:username/update',authMiddleware, editDescription);
export default favoriteRoutes;