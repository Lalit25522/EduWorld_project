//importing the post Model
import postModel from "../models/post.js"
//importing the cloudinary library
import { v2 as cloudinary } from "cloudinary";

//creating the create post function
export const createpost = async(req, res) => {
    //Extract the postContent from the req.body
    const {postContent} = req.body;
    //Set the userId which will take the req.userId parameter
    //req.userId will get the userId from the decoded jwt token
    const userId = req.userId;
    try{
        //creating a new instance newPost using the post Model and passing the postPicture, postContent and userId to link it to objectId of certain user login credentials
        const newPost = new postModel({postPicture: req.file.path, postContent, user: userId})

        //Saving the newPost to the database
        await newPost.save();
        //If the post is successfully created show this message
        return res.status(200).json({message: "Thank you for creating a post"})
    } catch (error){
        console.log(error)
        //If the post cannot be created show this message
        return res.status(400).json({message: "Server Error. Post can not be created. Please try again later."})
    }
}

//Creating the getallpost function
export const getallpost = async(req, res) => {
    try{
    // Trying to get all the posts from the database
    const post = await postModel.find();
    //If there is no post show this message
    if(!post){
        return res.status(404).json({message: "There are no posts to show"})
    }
    //If the post exist pass the post information
    res.json(post);
    } catch (error){
        //If post cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Posts can not be retrieved"})
    }
}

//Creating the getmypost function
export const getmypost = async(req, res) => {
    try{
    // Trying to get the posts that are associated with a certain user using its userId
    const post = await postModel.find({user: req.userId});
    //If there is no post show this message
    if(!post){
        return res.status(404).json({message: "You do not have any posts yet"})
    }
    //If the post exist pass the post information to the client
    res.json(post);
    } catch (error){
        //If post cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Posts can not be retrieved. Please try again later"})
    }
}

//Creating the updatepost function
export const updatepost = async (req, res) => {
    //Getting the postId using the req.params
    const {postId} = req.params;
    //Extract the postContent from the req.body
    const {postContent} = req.body;

    try{
        //Find the specific post to be edited using the postId
        const postinformation = await postModel.findById(postId);
        //If there is no post with that id show this message to the user
        if(!postinformation){
            return res.status(404).json({message: "There are no posts to show"})
        }
        //Updating the information with the new information from the update form
        postinformation.postContent = postContent;
        
        //If the photo in the update form already exist 
        if (req.file) {
            //The user enters a new image in update form 
            if (postinformation.postPicture) {
            //Get the publicId of the photo from the cloudinary URL
            // Reference: https://stackoverflow.com/questions/71529154/extract-public-id-from-cloudinary-url
              const publicId = postinformation.postPicture.split("/").pop().split(".")[0]; 
            //Then use the destroy function to delete the previous photo from cloudinary
            // Reference: https://cloudinary.com/documentation/deleting_assets_tutorial
              await cloudinary.uploader.destroy(publicId); 
            }
            //Get the new url for the new image posted in the cloudinary
            postinformation.postPicture = req.file.path
          }
          //Save the updated information in the database
          await postinformation.save();
        //If the data is updated succesfully show this message
        return res.status(200).json({message: "Post is successfully updated"})
    } catch (error) {
        //If an error occurred and the data can not be updated show this message
        console.log(error)
        return res.status(400).json({message: "Server Error. Post can not be updated. Please try again later."})
    }
}

//Creating the deletepost function
export const deletepost = async(req, res) => {
    //Getting the postId using the req.params
    const {postId} = req.params;

    try{
        //Find the specific post to be deleted using the postId
        const postinformation = await postModel.findById(postId);
        //If there is no post with that id show this message to the user
        if(!postinformation){
            return res.status(404).json({message: "There are no posts to show"})
        }
          //Delete the post from database using the postId 
          await postinformation.deleteOne({ postId })
          //If the post is deleted succesfully show this message
        return res.status(200).json({message: "Post is successfully Deleted"})
    } catch (error) {
        //If an error occurred and the post can not be deleted show this message
        console.log(error)
        return res.status(400).json({message: "Server Error. Post can not be Deleted. Please try again later."})
    }
}