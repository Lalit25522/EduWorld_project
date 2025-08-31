//Importing the mongoose library 
import mongoose from 'mongoose';

//Creating a mongooose model for the user profile form
const profileSchema = new mongoose.Schema ({
    // Creating the field for storing profile Photo URL with the type string
    profilePhoto: {
        type: String,
    },
    // Creating the field for storing First Name information with the type string and it is required field
    firstName: {
        type: String,
        require: true,
    },
    // Creating the field for storing Last Name information with the type string and it is required field
    lastName: {
        type: String,
        require: true,
    },
    // Creating the field for storing about information with the type string
    about: {
        type: String,
    },
    // Creating the field for storing Highest education information with the type string
    highestEducation: {
        type: String,
    },
    // Creating the field for storing highschool courses information with the type string
    highschoolcourses: {
        type: String,
    },
    // Creating the field for storing course1 information with the type string
    course1: {
        type: String,
    },
    // Creating the field for storing grade1 information with the type string
    grade1: {
        type: String,
    },
    // Creating the field for storing course2 information with the type string
    course2: {
        type: String,
    },
    // Creating the field for storing grade2 information with the type string
    grade2: {
        type: String,
    },
    // Creating the field for storing course3 information with the type string
    course3: {
        type: String,
    },
    // Creating the field for storing grade3 information with the type string
    grade3: {
        type: String,
    },
    // Creating the field for storing course4 information with the type string
    course4: {
        type: String,
    },
    // Creating the field for storing grade4 information with the type string
    grade4: {
        type: String,
    },
    // Creating the field for storing course5 information with the type string
    course5: {
        type: String,
    },
    // Creating the field for storing grade5 information with the type string
    grade5: {
        type: String,
    },
    // Creating the field for storing course6 information with the type string
    course6: {
        type: String,
    },
    // Creating the field for storing grade6 information with the type string
    grade6: {
        type: String,
    },
    // Creating the field for storing course7 information with the type string
    course7: {
        type: String,
    },
    // Creating the field for storing grade7 information with the type string
    grade7: {
        type: String,
    },
    // Creating the field for storing course8 information with the type string
    course8: {
        type: String,
    },
    // Creating the field for storing grade8 information with the type string
    grade8: {
        type: String,
    },
    // Creating the field for storing course9 information with the type string
    course9: {
        type: String,
    },
    // Creating the field for storing grade9 information with the type string
    grade9: {
        type: String,
    },
    // Creating the field for storing course10 information with the type string
    course10: {
        type: String,
    },
    // Creating the field for storing grade10 information with the type string
    grade10: {
        type: String,
    },
    // Creating the field for storing Bachelor Field information with the type string
    bachelorField: {
        type: String,
    },
    // Creating the field for storing Bachelor Institute information with the type string
    bachelorInstitite: {
        type: String,
    },
    // Creating the field for storing bachelor Start Month information with the type string
    bachelorstartMonth: {
        type: String,
    },
    // Creating the field for storing Bachelor Start Year information with the type string
    bachelorstartYear: {
        type: String,
    },
    // Creating the field for storing Bachelor End Month information with the type string
    bachelorendMonth: {
        type: String,
    },
    // Creating the field for storing Bachelor End Year information with the type string
    bachelorendYear: {
        type: String,
    },
    // Creating the field for storing Bachelor Grade  information with the type string
    bachelorGrade: {
        type: String,
    },
    // Creating the field for storing Master Field information with the type string
    masterField: {
        type: String,
    },
    // Creating the field for storing Master Institute information with the type string
    masterInstitite: {
        type: String,
    },
    // Creating the field for storing Master Start Month information with the type string
    masterstartMonth: {
        type: String,
    },
    // Creating the field for storing Master Start Year information with the type string
    masterstartYear: {
        type: String,
    },
    // Creating the field for storing Master End Month information with the type string
    masterendMonth: {
        type: String,
    },
    // Creating the field for storing Master End Year information with the type string
    masterendYear: {
        type: String,
    },
    // Creating the field for storing Master Grade information with the type string
    masterGrade: {
    },
    // Creating the field for storing achievement information with the type string
    achievement: {
        type: String,
    },
    // Creating the field for storing interest information with the type string
    interest: {
        type: String,
    }, 
    //Creating a field called user that will take the ObjectId from the user model to associate profile with a particular user.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

//Creating the mongoose model
const Profile = mongoose.model("Profile", profileSchema);

//Exporting the model for use
export default Profile;