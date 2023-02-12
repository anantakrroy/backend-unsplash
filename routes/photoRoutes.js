import express from "express";
import {getPhotoById, getPhotos} from "../controllers/photoController.js";

const photoRoutes = express.Router();

photoRoutes.get("", getPhotos);
photoRoutes.get("/:id", getPhotoById);

export default photoRoutes;
