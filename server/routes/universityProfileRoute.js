//importing the express library
import express from "express";
//importing different functions from the university profile controller
import {universityProfile, getuniprofile, updateuniprofile, deleteuniprofile} from "../controllers/universityProfileController.js"
//importing the cloudinary and multer information to save the image in the cloudinary and get the URL to store in the database
import {multerpic} from "../storage/multer.js"
//importing the authenticated function from Universityauthentication to authenticate the university to access the routes
import {uniauthenticated} from "../authentication/Universityauthentication.js"

//Creating a new express router object
const route = express.Router();

//Using the get request to fetch the university profile from the database using the getuniprofile. This request is only processed if the university is authenticated using jwt token
route.get("/", uniauthenticated, getuniprofile);
//Using the post request to create the university profile in the database using the universityProfile and using the multer to store the picture in the database. This request is only processed if the university is authenticated using jwt token
route.post("/create", uniauthenticated, multerpic.single('universityProfilePhoto'), universityProfile);
//Using the put request to update the university profile information in the database using the updateuniprofile and using the multer to store the new picture in the database. This request is only processed if the university is authenticated using jwt token
route.put("/:universityprofileId", uniauthenticated, multerpic.single("universityProfilePhoto"), updateuniprofile);
//Using the delete request to delete the university profile from the database using the deleteuniprofile. This request is only processed if the university is authenticated using jwt token
route.delete("/:universityprofileId", uniauthenticated, deleteuniprofile);
  
export default route;