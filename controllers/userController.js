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
        // console.log(`User in request : ${username} ${email} ${password}`); 
        const modelresponse = await register(user);
        // console.log(`Model response --> ${modelresponse}`);
        
        res.send(modelresponse);
    } catch (error) {
        next(error);
        // const err = error
        // res.status(400).json({
        //     "message" : error
        // });
        // console.log(`Controller error ..>`, error);
        // next(error);
    }
}