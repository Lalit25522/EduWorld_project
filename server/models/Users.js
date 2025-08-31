//importing the mongoose library
import mongoose from 'mongoose';

//creating a mongoose schema for the user registration form
const userSchema = new mongoose.Schema ({
    //Creating the field for storing Email address information with the type string and it is a required field along with unique
    email: {
        type: String,
        require: true,
        unique: true,
    },
    //Creating the field for storing Password information with the type string and it is a required field
    password: {
        type: String,
        require: true,
    },
    Verified: {
        type: Boolean,
        default: false,
    }
});

//Creating a mongoose model
const User = mongoose.model("User", userSchema);

//Exporting the model for use
export default User;