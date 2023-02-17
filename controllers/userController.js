//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { register } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config()

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.PEPPER;

export const newUser = async (req, res, next) => {
    try {
        console.log("Called user register controller....");
        const hashedPassword = bcrypt.hashSync(req.body.password + pepper, parseInt(saltRounds));
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }
        const modelresponse = await register(user);
        res.send(modelresponse);
    } catch (error) {
        //  error from model comes in JSON string format
        //  error type is Object. Use Object.getOwnPropertyNames to
        //  get values of keys - "stack" and "message"
        //  "message" is of interest, convert to JSON
        //  pass it to the next function so that
        //  error middleware can handle it
        next(JSON.parse(error.message));
    }
}