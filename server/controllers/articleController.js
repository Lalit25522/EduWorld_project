//importing the article Model
import articleModel from "../models/Article.js"
//importing the cloudinary library
import { v2 as cloudinary } from "cloudinary";

//creating the createarticle function
export const createArticle = async(req, res) => {
    //Extract the articleTitle and articleContent from the req.body
    const {articleTitle, articleContent} = req.body;
    //Set the userId which will take the req.userId parameter
    //req.userId will get the userId from the decoded jwt token
    const userId = req.userId;

    try{
        //creating a new instance newArticle using the article Model and passing the articleTitle, articleContent, articleContent and userId to link it to objectId of certain user login credentials
        const newArticle = new articleModel({articleTitle, articleContent, articlePicture: req.file.path, user: userId})
        //Saving the newArticle to the database
        await newArticle.save();
        //If the article is successfully created show this message
        return res.status(200).json({message: "Thanks for creating an Article"})
    } catch (error){
        //If the article cannot be created show this message
        return res.status(400).json({message: "Server Error. Article can not be created. Please try again later."})
    }
}
//Creating the getallArticle function
export const getallArticle = async(req, res) => {
    try{
    // Trying to get all the articles from the database
    const article = await articleModel.find();
    //If there is no articles show this message
    if(!article){
        return res.status(404).json({message: "There are no articles to show"})
    }
    //If the article exist pass the article information to the client
    res.json(article);
    } catch (error){
        //If article cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Article can not be retrieved. Please try again later."})
    }
}

//Creating the getmyArticle function
export const getmyArticle = async(req, res) => {
    
    try{
    // Trying to get the articles that are associated with a certain user using its userId
    const article = await articleModel.find({user: req.userId});
     //If there is no articles show this message
    if(!article){
        return res.status(404).json({message: "There are no articles to show"})
    }
    //If the article exist pass the article information to the client
    res.json(article);
    } catch (error){
        //If article cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Article can not be retrieved"})
    }
}

//Creating the updatearticle function
export const updatearticle = async (req, res) => {
    //Getting the articleId using the req.params
    const {articleId} = req.params;
    //Extract the articleTitle and articleContent from the req.body
    const {articleTitle, articleContent} = req.body;

    try{
        //Find the specific article to be edited using the articleId
        const articleinformation = await articleModel.findById(articleId);
        //If there is no article with that id show this message to the user
        if(!articleinformation){
            return res.status(404).json({message: "You do not have a article with this Id"})
        }
        //Updating the information with the new information from the update form
        articleinformation.articleTitle = articleTitle;
        articleinformation.articleContent = articleContent
        
        //If the photo in the update form already exist 
        if (req.file) {
            //The user enters a new image in update form 
            if (articleinformation.articlePicture) {
            //Get the publicId of the photo from the cloudinary URL
            // Reference: https://stackoverflow.com/questions/71529154/extract-public-id-from-cloudinary-url
              const publicId = articleinformation.articlePicture.split("/").pop().split(".")[0]; 
            //Then use the destroy function to delete the previous photo from cloudinary
            // Reference: https://cloudinary.com/documentation/deleting_assets_tutorial
              await cloudinary.uploader.destroy(publicId); 
            }
            //Get the new url for the new image posted in the cloudinary
            articleinformation.articlePicture = req.file.path
          }
          //Save the updated information in the database
          await articleinformation.save();
        //If the data is updated succesfully show this message
        return res.status(200).json({message: "Article is successfully updated"})
    } catch (error) {
        //If an error occurred and the data can not be updated show this message
        console.log(error)
        return res.status(400).json({message: "Server Error. Article can not be updated. Please try again later."})
    }   
}

//Creating the deletearticle function
export const deletearticle = async(req, res) => {
    //Getting the articleId using the req.params
    const {articleId} = req.params;
    try{
        //Find the specific article to be deleted using the articleId
        const articleinformation = await articleModel.findById(articleId);
        //If there is no article with that id show this message to the user
        if(!articleinformation){
            return res.status(404).json({message: "You do not have a article with this Id"})
        }
          //Delete the article from database using the articleId
          await articleinformation.deleteOne({ articleId })
        //If the article is deleted succesfully show this message
        return res.status(200).json({message: "Article is successfully Deleted"})
    } catch (error) {
        //If an error occurred and the article can not be deleted show this message
        console.log(error)
        return res.status(400).json({message: "Server Error. Article can not be Deleted. Please try again later"})
    }
}