//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { register, login } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config()

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.PEPPER;
const secret = process.env.JWT_SECRET;

// Register new user
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
        res.status(200).json({ "user": modelresponse, "message": "User registration success !" });
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

// Login user
export const loginUser = async (req, res, next) => {
    try {
        console.log("Login controller called......");
        const user = req.body;
        const modelresponse = await login(user)
        if (user) {
            const passMatch = bcrypt.compareSync(user.password + pepper, modelresponse.password);
            console.log(`Passwords match ? ${passMatch}`);
            if (passMatch) {
                const token = jwt.sign({
                    data: {
                        "username": user.username,
                        "email": user.email,
                    }
                },
                    secret,
                    {
                        expiresIn: "1h"
                    })
                res.status(200).json({ "token": token });
            } else {
                res.status(200).json({
                    "message": "Wrong password entered !"
                })
            }
        } else {
            res.status(200).json({
                "message": "Email not registered !"
            })
        }
    } catch (error) {
        next(error);
    }
}

// Logout user
export const logoutUser = async (req, res, next) => {
    console.log("Logout controller called ......");
    try {
        const random = String(Math.floor(Math.random() * 1000 + 1));
        const randIdx = Math.floor(Math.random() * 10 + 1);
        const hashedNumberStr = await bcrypt.hashSync(random, randIdx);
        const token = req.get("authorization").split(" ")[1];
        req.headers.authorization = "Bearer " + token + hashedNumberStr;
        console.log(req.get("Authorization"));
        res.status(200).json({
            "message": "Logout success !",
            "newToken": req.get("Authorization")
        });
    } catch (error) {
        next(error);
    }
}

// User details
export const userInfo = async (req, res, next) => {
    console.log("User info controller called ......");
    try {
       const userDetails = req.data; 
       res.status(200).json({
        "user" : userDetails
       })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
