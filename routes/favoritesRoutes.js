import express from "express";
import { addToFavorites } from "../controllers/favoritesController.js";

const favoriteRoutes = express.Router();

favoriteRoutes.post('/add', addToFavorites)
export default favoriteRoutes;