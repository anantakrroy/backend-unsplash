import express from "express";
import cors from "cors";
import photoRoutes from "../routes/photoRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors);

app.get("/", (req, res) => {
    res.status(200).json({
        "message" : "Welcome to the Unsplash API !"
    })
})

app.use('/api/photos', photoRoutes);

app.listen(port, () => console.log("Server listening on port : ", port));
