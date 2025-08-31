//importing the mongoose model
import mongoose from 'mongoose';

//creating the mongoose schema for the post form
const postSchema = new mongoose.Schema ({
    //Creating the field for storing post Content information with the type string and it is a required field
    postContent: {
        type: String,
        require: true,
    },
    //creating the field for storing post picture URL with the type string 
    postPicture: {
        type: String,
    },
    //Creating a field called user that will take the ObjectId from the user model to associate posts with a particular user.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

//Creating a mongoose model
const Post = mongoose.model("Post", postSchema);

//Exporting the model for use
export default Post;