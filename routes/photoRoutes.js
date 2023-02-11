import express from "express";
import {getPhotos} from "../controllers/photoController.js";

const photoRoutes = express.Router();

photoRoutes.get("/", getPhotos);

export default photoRoutes;
