import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const secret = process.env.JWT_SECRET;
export const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware called ......");
    try {
        if (!req.headers.authorization)
            throw {
                "name": "AuthorizationError",
                "message": "User is not authorized !",
                "statusCode": 401
            }
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);
        const username = req.params.username;
        const userLoggingIn = payload.data.username;
        if (username !== userLoggingIn) {
            throw {
                "name": "AuthorizationError",
                "message": "Unauthenticated user ! You can add photos to your own collection !",
                "statusCode": 401
            }
        }
        req.data = payload.data;
        next();
    } catch (error) {
        next(error);
    }
} 