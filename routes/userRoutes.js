import express from "express";
import axios , {all} from "axios";
import dotenv from "dotenv";
import { loginUser, logoutUser, newUser, userInfo } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", newUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/:username/me",authMiddleware, userInfo);
export default userRoutes;