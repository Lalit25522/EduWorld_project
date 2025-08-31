//importing the express library
import express from "express";
//importing different functions from the create profile controller
import {createProfile, getmyProfile, updateprofile, deleteprofile, searchprofile, getSearchProfile, getuniSearchProfile, getprofileId} from "../controllers/CreateProfileController.js"
//importing the cloudinary and multer information to save the image in the cloudinary and get the URL to store in the database
import {multerpic} from "../storage/multer.js"
//importing the authenticated function from Studentauthentication to authenticate the user to access the routes
import {authenticated} from "../authentication/Studentauthentication.js"
 
//Creating a new express router object
const route = express.Router();

//Using the get request to fetch the user profile from the database using the getmyProfile. This request is only processed if the user is authenticated using jwt token
route.get("/", authenticated, getmyProfile);
route.get("/profileId", authenticated, getprofileId);
//Using the get request to search the user profile from the database using the searchprofile. This request is only processed if the user is authenticated using jwt token
route.get("/Search", authenticated, searchprofile);
//Using the post request to create the user profile in the database using the createProfile and using the multer to store the picture in the database. This request is only processed if the user is authenticated using jwt token
route.post("/createprofile", authenticated, multerpic.single("profilePhoto"), createProfile);
//Using the put request to update the user profile information in the database using the updateprofile and using the multer to store the new picture in the database. This request is only processed if the user is authenticated using jwt token
route.put("/:profileId", authenticated, multerpic.single("profilePhoto"), updateprofile);
//Using the delete request to delete the user profile from the database using the deleteprofile. This request is only processed if the user is authenticated using jwt token
route.delete("/:profileId", authenticated, deleteprofile);
//Using the get request to fetch the user profile that the user clicked on in the search from the database using the getSearchProfile. This request is only processed if the user is authenticated using jwt token
route.get("/:profileId", authenticated, getSearchProfile);
route.get("/uni/:universityprofileId", authenticated, getuniSearchProfile);

//exporting all the routes
export default route;