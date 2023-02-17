import express from "express";
import axios , {all} from "axios";
import dotenv from "dotenv";
import { newUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", newUser);

export default userRoutes;