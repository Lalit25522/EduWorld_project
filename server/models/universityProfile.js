//importing the mongoose library
import mongoose from 'mongoose';

//creating a mongoose schema for the university profile form 
const universityProfileSchema = new mongoose.Schema ({
    // Creating the field for storing University Profile Photo URL with the type string 
    universityProfilePhoto: {
        type: String,
    },
    // Creating the field for storing university Name information with the type string and it is required field
    universityName: {
        type: String,
        require: true,
    },
    // Creating the field for storing university location information with the type string and it is required field
    universityLocation: {
        type: String,
        require: true,
    },
    // Creating the field for storing university Website information with the type string and it is required field
    universityWebsite: {
        type: String,
        require: true,
    },
    // Creating the field for storing University Email information with the type string and it is required field
    universityEmail: {
        type: String,
        require: true,
    },
    // Creating the field for storing university Description information with the type string and it is required field
    universityDescription: {
        type: String,
        require: true,
    },
    //Creating a field called university that will take the ObjectId from the university model to associate profiles with a particular university
    university:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
        required: true
    }
});

//Creating the mongoose model
const UniversityProfile = mongoose.model("universityProfile", universityProfileSchema);

//Exporting the model for use
export default UniversityProfile;