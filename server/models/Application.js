//importing the mongoose library
import mongoose from 'mongoose';

//creating a mongoose schema for the application form
const applicationSchema = new mongoose.Schema ({
    // Creating the field for storing course Name information with the type string and it is required field
    courseName: {
        type: String,
        require: true,
    },
    // Creating the field for storing course Overview information with the type string and it is required field
    courseOverview: {
        type: String,
        require: true,
    },
    // Creating the field for storing course Details information with the type string and it is required field
    courseDetails: {
        type: String,
        require: true,
    },
    // Creating the field for storing Career opportunities information with the type string and it is required field
    careerOpportunities: {
        type: String,
        require: true,
    },
    // Creating the field for storing entry requirements information with the type string and it is required field
    entryRequirements: {
        type: String,
        require: true,
    },
    // Creating the field for storing tuition fees information with the type string and it is required field
    tuitionFees: {
        type: String,
        require: true,
    },
    // Creating the field for storing application picture URL for the application with the type string
    applicationPicture: {
        type: String
    },
    //Creating a field called university that will take the ObjectId from the university model to associate applications with a particular university
    university:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
        required: true
    }
});

//Creating the mongoose model
const Application = mongoose.model("Application", applicationSchema);

//Exporting the model for use
export default Application;