//importing the express library
import express from "express";
//importing different functions from the university controller
import {register, login, forgotpassword, resetPassword, verifyEmail} from "../controllers/UserController.js";

//Creating a new express router object
const route = express.Router();

//Using the post request to store the user email and passwrod in the database using the register
route.post("/student/register", register);
//Using the post request to send the information to the database to compare it to the registered user information to login the user
route.post("/student/login", login);
//using the post request to send the email for forgot password
route.post("/student/forgotpassword", forgotpassword);
//using the post request to update the password in the database
route.post("/student/resetPassword", resetPassword);

route.post("/student/verifyemail", verifyEmail)
//exporting all the routes
export default route; 