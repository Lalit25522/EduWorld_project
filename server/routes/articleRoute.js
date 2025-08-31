//importing the express library
import express from "express";
//importing different functions from the article controller
import {createArticle, getallArticle, getmyArticle, updatearticle, deletearticle} from "../controllers/articleController.js"
//importing the cloudinary and multer information to save the image in the cloudinary and get the URL to store in the database
import {multerpic} from "../storage/multer.js"
//importing the authenticated function from Studentauthentication to authenticate the user to access the routes
import {authenticated} from "../authentication/Studentauthentication.js"

//Creating a new express router object
const route = express.Router();

//Using the get request to fetch all the articles from the database using the getallArticle. This request is only processed if the user is authenticated using jwt token
route.get("/", authenticated, getallArticle);
//Using the get request to fetch the articles posted by a particular user from the database using the getmyArticle. This request is only processed if the user is authenticated using jwt token
route.get("/myarticle", authenticated, getmyArticle);
//Using the post request to create the article in the database using the createArticle and using the multer to store the picture in the database. This request is only processed if the user is authenticated using jwt token
route.post("/create", authenticated, multerpic.single("articlePicture"), createArticle);
//Using the put request to update the article information in the database using the updatearticle and using the multer to store the new picture in the database. This request is only processed if the user is authenticated using jwt token
route.put("/:articleId", authenticated, multerpic.single("articlePicture"), updatearticle);
//Using the delete request to delete the article from the database using the deletearticle. This request is only processed if the user is authenticated using jwt token
route.delete("/:articleId", authenticated, deletearticle);
  
//exporting all the routes
export default route;