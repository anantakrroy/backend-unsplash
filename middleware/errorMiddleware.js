import dotenv from "dotenv";

dotenv.config();

const env = process.env.ENV;

export const errorHandler = (err, req, res, next) => {
    console.log("Error handler middleware called....", Object.getOwnPropertyNames(err));
    console.log(`Error ------> ${err}`);
    try {
        // Authorization Error
        if (err.name === "AuthorizationError")
            env === "dev" ? res.status(err.statusCode).json({
                "statusCode": err.statusCode,
                "stack": err.stack,
                "message": err.message
            }) : res.status(err.statusCode).json({
                "statusCode": err.statusCode,
                "message": err.message
            });
        // Jsonwebtokenerror
        if (err.name === "JsonWebTokenError")
            env === "dev" ? res.status(400).json({
                "statusCode": 400,
                "stack": err.stack,
                "message": err.message + "! Make sure the JWT verify method is correctly used !"
            }) : res.status(400).json({
                "statusCode": 400,
                "message": err.message + "! Make sure the JWT verify method is correctly used !"
            });
        // Type error
        if (err.name === "TypeError")
            // console.log("refernce error")
            env === "dev" ? res.status(400).json({
                "statusCode": 400,
                "stack": err.stack,
                "message": err.message
            }) : res.status(400).json({
                "statusCode": 400,
                "message": err.message
            });
        // Reference error
        if (err.name === "ReferenceError")
            // console.log("refernce error")
            env === "dev" ? res.status(400).json({
                "statusCode": 400,
                "stack": err.stack,
                "message": err.message
            }) : res.status(400).json({
                "statusCode": 400,
                "message": err.message
            });
        // Validation error
        if (err.name === "ValidationError") {
            console.log("validator error called........")
            console.log(err)
            process.env.ENV === "dev" ? res.status(400).json({
                "statusCode": 400,
                "message": err.message,
                "stack": err.stack
            }) :
                res.status(400).json({
                    "statusCode": 400,
                    "message": err.message,
                })
        }
        // Duplicate key error
        if (err.code && err.code === 11000) {
            console.log("duplicate key error called.......");
            const prop = Object.keys(err.keyValue);
            const code = 409
            const message = `${prop} already exists !`;
            res.status(code).json({
                "statusCode": code,
                "message": message,
                keys: prop
            });
        }
    } catch (error) {
        res.status(500).json({
            "statusCode": 500,
            "message": "Unexpected error occurred!"
        })
    }
}