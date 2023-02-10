const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        "message" : "Welcome to the Unsplash API !"
    })
})

app.listen(port, () => console.log("Server listening on port : ", port));
