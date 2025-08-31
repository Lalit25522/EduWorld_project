//importing the mongoose library
import mongoose from 'mongoose';

//creating a mongoose schema for the article form
const articleSchema = new mongoose.Schema ({
    // Creating the field for storing article Title information with the type string and it is required field
    articleTitle: {
        type: String,
        require: true,
    },
    // Creating the field for storing article Content information with the type string and it is required field
    articleContent: {
        type: String,
        require: true,
    },
    // Creating the field for storing article Picture URL with the type string
    articlePicture: {
        type: String,
    },
    //Creating a field called user that will take the ObjectId from the user model to associate articles with a particular user.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

//creating the mongoose model
const Article = mongoose.model("Article", articleSchema);

//Exproting the article model for use
export default Article;