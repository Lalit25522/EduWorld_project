//importing the express library
import express from "express";
//importing different functions from the application controller
import {createApplication, getallapplications, getmyapplications, updateapplications, deleteapplications} from "../controllers/applicationController.js"
//importing the cloudinary and multer information to save the image in the cloudinary and get the URL to store in the database
import {multerpic} from "../storage/multer.js"
//importing the authenticated function from Universityauthentication to authenticate the university to access the routes
import {uniauthenticated} from "../authentication/Universityauthentication.js"
//importing the authenticated function from Studentauthentication to authenticate the user to access the routes
import {authenticated} from "../authentication/Studentauthentication.js"

//Creating a new express router object
const route = express.Router();

//Using the get request to fetch all the applications from the database using the getallapplications. This request is only processed if the university is authenticated using jwt token
route.get("/", [uniauthenticated, authenticated], getallapplications);
//Using the get request to fetch the applications posted by a particular university from the database using the getmyapplications. This request is only processed if the university is authenticated using jwt token
route.get("/myapplications", uniauthenticated, getmyapplications);
//Using the post request to create the application in the database using the createApplication and using the multer to store the picture in the database. This request is only processed if the university is authenticated using jwt token
route.post("/create", uniauthenticated, multerpic.single("applicationPicture"), createApplication);
//Using the put request to update the application information in the database using the updateapplications and using the multer to store the new picture in the database. This request is only processed if the university is authenticated using jwt token
route.put("/:applicationId", uniauthenticated, multerpic.single("applicationPicture"), updateapplications);
//Using the delete request to delete the application from the database using the deleteapplications. This request is only processed if the university is authenticated using jwt token
route.delete("/:applicationId", uniauthenticated, deleteapplications);

//exporting all the routes
export default route;