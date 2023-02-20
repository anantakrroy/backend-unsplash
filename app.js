import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import photoRoutes from "./routes/photoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import favoriteRoutes from "./routes/favoritesRoutes.js";
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
app.use('/api/user/favorites', favoriteRoutes);

app.use(errorHandler);

app.listen(port, () => console.log("Server listening on port : ", port));
