//importing the express library
import express from "express";
//importing different functions from the message controller
import{senduserMessage, retrieveChat, retrieveMessageinChat, startnewChat} from "../controllers/messagingController.js"
//importing the authenticated function from Studentauthentication to authenticate the user to access the routes
import {authenticated} from "../authentication/Studentauthentication.js";

//Creating a new express router object
const route = express.Router();

route.post("/newChat", authenticated, startnewChat);
//Using the post request to send the message using the senduserMessage. This request is only processed if the user is authenticated using jwt token.
route.post("/sendmessage", authenticated, senduserMessage);
//Using the get request to fetch all the chats from the database using the retrieveChat. This request is only processed if the user is authenticated using jwt token
route.get("/chat", authenticated, retrieveChat);
//Using the get request to fetch all the messages of a particular chat from the database using the retrieveMessageinChat. This request is only processed if the user is authenticated using jwt token
route.get("/chat/:chatId", authenticated, retrieveMessageinChat);

//exporting all the routes
export default route;