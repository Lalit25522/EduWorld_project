//importing the express library
import express from "express";
//importing different functions from the university controller
import {register, login, forgotpassword, resetPassword} from "../controllers/UniversityController.js";

//Creating a new express router object
const route = express.Router();

//Using the post request to store the university email and passwrod in the database using the register
route.post("/registerform", register);
//Using the post request to send the information to the database to compare it to the registered university information to login the university
route.post("/login", login);
//using the post request to send the email for forgot password
route.post("/forgotpassword", forgotpassword);
//using the post request to update the password in the database
route.post("/resetPassword", resetPassword);

//exporting all the routes
export default route;