import express from "express";
import cors from "cors";
import photoRoutes from "./routes/photoRoutes.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({
        "message" : "Welcome to the Unsplash API !"
    })
})

app.use('/api/photos', photoRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log("Server listening on port : ", port));
