import express from "express";
import {getPhotos} from "../controllers/photoController";

const photoRoutes = express.Router();

photoRoutes.get("/", getPhotos);

export default photoRoutes;
// module.exports = photoRoutes;