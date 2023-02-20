import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const secret = process.env.JWT_SECRET;
export const authMiddleware = async(req, res, next) => {
    console.log("Auth middleware called ......");
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);
        // console.log(token);
        // console.log(payload);
        req.data = payload.data;
        next();
    } catch (error) {
        next(error);
    }
}