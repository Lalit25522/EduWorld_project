//importing the express library
import express from "express";
//importing different functions from the post controller
import {createpost, getallpost, getmypost, updatepost, deletepost} from "../controllers/postController.js"
//importing the cloudinary and multer information to save the image in the cloudinary and get the URL to store in the database
import {multerpic} from "../storage/multer.js"
//importing the authenticated function from Studentauthentication to authenticate the user to access the routes
import {authenticated} from "../authentication/Studentauthentication.js"

//Creating a new express router object
const route = express.Router();

//Using the get request to fetch all the posts from the database using the getallpost. This request is only processed if the user is authenticated using jwt token
route.get("/", authenticated, getallpost);
//Using the get request to fetch the articles posted by a particular user from the database using the getmypost. This request is only processed if the user is authenticated using jwt token
route.get("/mypost", authenticated, getmypost);
//Using the post request to create the post in the database using the createpost and using the multer to store the picture in the database. This request is only processed if the user is authenticated using jwt token
route.post("/create", authenticated, multerpic.single("postPicture"), createpost);
//Using the put request to update the post information in the database using the updatepost and using the multer to store the new picture in the database. This request is only processed if the user is authenticated using jwt token
route.put("/:postId", authenticated, multerpic.single("postPicture"), updatepost);
//Using the delete request to delete the post from the database using the deletepost. This request is only processed if the user is authenticated using jwt token
route.delete("/:postId", authenticated, deletepost);

//exporting all the routes
export default route;