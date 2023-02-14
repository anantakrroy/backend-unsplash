//Require axios to make API calls
import axios, { all } from "axios";
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://api.unsplash.com";
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;


// GET the list of raw photos urls
export const getPhotos = async(req, res) => {
    console.log("Called getPhotos controller .....")
    try {
        const allPics = await axios.get(`${API_URL}/photos/?client_id=${ACCESS_KEY}`);
        console.log(allPics);
        let rawUrls =[];
        // print all raw urls
        allPics.data.forEach(element => {
            rawUrls.push(element.urls["raw"])
        });
        res.status(200).json({"rawUrls" : rawUrls});
    } catch (error) {
        res.status(500).json({"message" : `${error}`});
    }
}

// GET the photo object based on photos id
export const getPhotoById = async(req,res) => {
    console.log("Called getPhotoById controller .....")
    try {
        const id = req.params.id;
        const photoById = await axios.get(`${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`);
        // console.log(photoById);
        res.status(200).json({"photo" : `${stringify(photoById)}`});
    } catch (error) {
        res.status(500).json({"message" : `${error}`});
    }
}

// GET photos by username
export const getPhotoByUser = async(req, res) => {
    console.log("Calling getPhotoByUser controller....");
    try {
        const username = req.params.username;
        const photoByUser = await axios.get(`${API_URL}/users/${username}/photos/?client_id=${ACCESS_KEY}`);
        res.status(200).json({"photo" : photoByUser});
    } catch (error) {
        res.status(`${error.response.status}`).json({"message" : `${error.response.statusText}`});
    }
}

