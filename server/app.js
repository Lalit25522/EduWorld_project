//importing all the libararies required
import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
//Importing various routes from various routed files
import userRoute from "./routes/userRoutes.js";
import universityRoute from "./routes/universityRoutes.js";
import createProfileRoute from "./routes/createProfileRoute.js";
import universitycreateProfileRoute from "./routes/universityProfileRoute.js";
import postRoute from "./routes/postRoute.js";
import articleRoute from "./routes/articleRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import messageRoute from "./routes/messagingRoute.js"
//import socket from the socket file
import {socket} from "./storage/socket.js"
//importing to get credentials from .env file
import {} from "dotenv/config";


//Connceting to the mongodb to store the information
const connect = mongoose.connect(
    process.env.DB_URI
)
if(connect){
  //Show once the server has successfully connected to the server
  console.log("Connected to the Mongodb Database")
} else{
  //In case the server cannot connect to database show this error
  console.error("Something went Wrong Could not connect to the database")
}

//Execute express
const app = express();
//using the express router
app.use(express.Router())
//Use it to parse the incoming requests as JSON
app.use(express.json());
//use to interact the front end and back end scripts
app.use(cors());

//creating the http server
const server = http.createServer(app);
//passing the httpserver in the socket
const io = socket(server);
//various route requests
app.use("/", userRoute);
app.use("/university", universityRoute);
app.use("/studentprofile", createProfileRoute);
app.use("/universityprofile", universitycreateProfileRoute);
app.use("/post", postRoute);
app.use("/article", articleRoute);
app.use("/application", applicationRoute);
app.use("/message", messageRoute);

//Staring the server in the back on 4000
server.listen(4000, () => {
    console.log("The Server in the backend has started");
  });

//exporting the app for use
export default app;