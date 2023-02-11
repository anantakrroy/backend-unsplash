//Require axios to make API calls
import axios, { all } from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://api.unsplash.com";
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const getPhotos = async(req, res) => {
    try {
        const allPics = await axios.get(`${API_URL}/photos/?client_id=${ACCESS_KEY}`);
        let rawUrls =[];
        // print all raw urls
        allPics.data.forEach(element => {
            rawUrls.push(element.urls["raw"])
        });
        res.status(200).json({"rawUrls" : rawUrls});
    } catch (error) {
        res.status(400).json({"message" : error.message});
    }
}