import express from "express";
import { addToFavorites, getFavorites, removeFavorite } from "../controllers/favoritesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const favoriteRoutes = express.Router();

favoriteRoutes.post('/:username/add',authMiddleware, addToFavorites);
favoriteRoutes.get('/:username',authMiddleware, getFavorites);
favoriteRoutes.get('/:username/delete',authMiddleware, removeFavorite);
export default favoriteRoutes;