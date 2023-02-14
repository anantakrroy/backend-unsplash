import express from "express";
import {getPhotoById, getPhotoByUser, getPhotos} from "../controllers/photoController.js";

const photoRoutes = express.Router();

photoRoutes.get("", getPhotos);
photoRoutes.get("/:id", getPhotoById);
photoRoutes.get("/user/:username",getPhotoByUser);

export default photoRoutes;
