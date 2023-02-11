//Require axios to make API calls
const axios = require("axios");
const API_URL = "https://api.unsplash.com/";

export const getPhotos = async() => {
    try {
        let res = await axios.get(`${API_URL}/photos`);
        console.log(res);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
        // console.error(error.message);
    }
}