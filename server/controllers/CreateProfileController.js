//importing the profile Model
import profileModel from "../models/Profile.js";
//importing the university profile model to search uni profile
import universityprofileModel from "../models/universityProfile.js"
//importing the cloudinary library
import { v2 as cloudinary } from "cloudinary";

//creating the create profile function
export const createProfile = async(req,res) => {
  //Extract the following information from the req.body
  const {firstName, lastName, about, highestEducation, highschoolcourses, course1, grade1, course2, grade2, course3, grade3, course4, grade4, course5, grade5, course6, grade6,
     course7, grade7, course8, grade8, course9, grade9, course10, grade10, bachelorField, bachelorInstitite, bachelorstartMonth, bachelorstartYear, bachelorendMonth, bachelorendYear, 
      bachelorGrade, masterField, masterInstitite, masterstartMonth, masterstartYear, masterendMonth, masterendYear, masterGrade, achievement, interest} = req.body;
      //Set the userId which will take the req.userId parameter
      //req.userId will get the userId from the decoded jwt token
      const userId = req.userId;

    try{
    //creating a new instance newProfile using the profile Model and passing the following information and userId to link it to objectId of certain user login credentials
    const newProfile = new profileModel({profilePhoto: req.file.path, firstName, lastName, about, highestEducation, highschoolcourses, course1, grade1, course2, grade2, course3, grade3, course4, grade4, course5, grade5, course6, grade6,
      course7, grade7, course8, grade8, course9, grade9, course10, grade10, bachelorField, bachelorInstitite, bachelorstartMonth, bachelorstartYear, bachelorendMonth, bachelorendYear, 
      bachelorGrade, masterField, masterInstitite, masterstartMonth, masterstartYear, masterendMonth, masterendYear, masterGrade, achievement, interest, user: userId});
    //Saving the newProfile to the database
    await newProfile.save();
    //If the profile is successfully created show this message
    return res.status(200).json({ message: "Thank you for creating your profile" });
    } catch (error) {
      //If the profile cannot be created show this message
      return res.status(400).json({ message: "Server Error. Could not create a new profile. Please try again later"});
    }
  }


export const searchprofile = async(req, res) => {
  //Extracting the firstName from the req.body
  const {firstName} = req.query;
  
  try{
    //If there is no firstName show this message
    if(!firstName) {
      return res.status(404).json({message: "Please enter the First Name for the search"})
    }

    //Getting the search result according to the firstName
    const searchresult = await profileModel.find({firstName: {
      //Case sensitive search of the profile
      $regex: firstName, $options: "i" 
    }})

    const unisearchresult = await universityprofileModel.find({universityName: {
      //Case sensitive search of the profile
      $regex: firstName, $options: "i" 
    }})
    //Checking if the array of profiles returned from Mongodb is emplty
    // If it is empty show the error
    if(searchresult.length === 0 && unisearchresult.length === 0){
      return res.status(404).json({message: "There are no profiles with First Name"})
    }

    //pass the search result information to the client 
    res.json({searchresult, unisearchresult});
  }catch (error){
    console.log(error)
    //If profile cannot be retrieved from the database show this error
    return res.status(400).json({message: "Server error. Profile can not be Searched. Please try again later."})
  }
}

  //Creating the getmyProfile function
  export const getmyProfile = async(req, res) => {
  //Set the userId which will take the req.userId parameter
  //req.userId will get the userId from the decoded jwt token
  const userId = req.userId
    try{
    // Trying to get the profile that is associated with a certain user using its userId
    const profile = await profileModel.find({user: userId});
    //If there is no profile show this message
    if(!profile){
        return res.status(404).json({message: "Your profile does not exist"})
    }
    //If the profile exist pass the profile information to the client
    res.json(profile);
    } catch (error){
      //If profile cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Profile cannot be retrieved. Please try again later."})
    }
}

//Creating the getprofileId function
export const getprofileId = async(req, res) => {
  //Set the userId which will take the req.userId parameter
  //req.userId will get the userId from the decoded jwt token
  const userId = req.userId
  try{
    // Trying to get the profile that is associated with a certain user using its userId
    const profile = await profileModel.findOne({user: userId});
    //If there is no profile show this message
    if(!profile){
        return res.status(404).json({message: "Your profile does not exist"})
    }
    //If the profile exist pass the profile id to the client
    res.json({profileId: profile._id});
  } catch (error){
      //If profile cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Profile cannot be retrieved. Please try again later."})
  }
}


//Creating the getSearchProfile function
export const getSearchProfile = async(req, res) => {
  //Getting the profileId using the req.params
  const {profileId} = req.params;

  try{
  // Trying to get the profile according to the profileId 
  const profile = await profileModel.findById(profileId);
   //If there is no profiles show this message
  if(!profile){
      return res.status(404).json({message: "There are no profiles to show"})
  }
  //If the profile exist pass the profile information to the client
  res.json(profile);
  } catch (error){
      console.log(error)
      //If profile cannot be retrieved from the database show this error
      return res.status(400).json({message: "Server Error. Profile can not be retrieved. Please try again later."})
  }
}

//Creating the getSearchProfile function
export const getuniSearchProfile = async(req, res) => {
  //Getting the profileId using the req.params
  const {universityprofileId} = req.params;
  console.log("Hello" + universityprofileId)
  try{
  // Trying to get the profile according to the profileId 
  const profile = await universityprofileModel.findById(universityprofileId);
   //If there is no profiles show this message
  if(!profile){
      return res.status(404).json({message: "There are no university profile to show"})
  }

  //If the profile exist pass the profile information to the client
  res.json(profile);
  } catch (error){
      console.log(error)
      //If profile cannot be retrieved from the database show this error
      return res.status(400).json({message: "Server Error. Profile can not be retrieved. Please try again later."})
  }
}

//Creating the updateprofile function
export const updateprofile = async (req, res) => {
    //Getting the profileId using the req.params
    const {profileId} = req.params;
    //Extract the following information from the req.body
    const {firstName, lastName, about, highestEducation, highschoolcourses, course1, grade1, course2, grade2, course3, grade3, course4, grade4, course5, grade5, course6, grade6,
      course7, grade7, course8, grade8, course9, grade9, course10, grade10, bachelorField, bachelorInstitite, bachelorstartMonth, bachelorstartYear, bachelorendMonth, bachelorendYear, 
       bachelorGrade, masterField, masterInstitite, masterstartMonth, masterstartYear, masterendMonth, masterendYear, masterGrade, achievement, interest} = req.body;

    try{
        //Find the specific profile to be edited using the profileId
        const profileinformation = await profileModel.findById(profileId);
        //If there is no profile with that id show this message to the user
        if(!profileinformation){
            return res.status(404).json({message: "You do not have a profile"})
        }

        //Updating the information with the new information from the update form
        profileinformation.firstName = firstName;
        profileinformation.lastName = lastName;
        profileinformation.about = about;
        profileinformation.highestEducation = highestEducation;
        profileinformation.highschoolcourses = highschoolcourses;
        profileinformation.course1 = course1;
        profileinformation.grade1 = grade1;
        profileinformation.course2 = course2;
        profileinformation.grade2 = grade2;
        profileinformation.course3 = course3;
        profileinformation.grade3 = grade3;
        profileinformation.course4 = course4;
        profileinformation.grade4 = grade4;
        profileinformation.course5 = course5;
        profileinformation.grade5 = grade5;
        profileinformation.course6 = course6;
        profileinformation.grade6 = grade6;
        profileinformation.course7 = course7;
        profileinformation.grade7 = grade7;
        profileinformation.course8 = course8;
        profileinformation.grade8 = grade8;
        profileinformation.course9 = course9;
        profileinformation.grade9 = grade9;
        profileinformation.course10 = course10;
        profileinformation.grade10 = grade10;
        profileinformation.bachelorField = bachelorField;
        profileinformation.bachelorInstitite = bachelorInstitite;
        profileinformation.bachelorstartMonth = bachelorstartMonth;
        profileinformation.bachelorstartYear = bachelorstartYear;
        profileinformation.bachelorendMonth = bachelorendMonth;
        profileinformation.bachelorendYear = bachelorendYear;
        profileinformation.bachelorGrade = bachelorGrade;
        profileinformation.masterField = masterField;
        profileinformation.masterInstitite = masterInstitite;
        profileinformation.masterstartMonth = masterstartMonth;
        profileinformation.masterstartYear = masterstartYear;
        profileinformation.masterendMonth = masterendMonth;
        profileinformation.masterendYear = masterendYear;
        profileinformation.masterGrade = masterGrade;
        profileinformation.achievement = achievement;
        profileinformation.interest = interest;

        //If the photo in the update form already exist 
        if (req.file) {
            //The user enters a new image in update form 
            if (profileinformation.profilePhoto) {
            //Get the publicId of the photo from the cloudinary URL
            // Reference: https://stackoverflow.com/questions/71529154/extract-public-id-from-cloudinary-url
              const publicId = profileinformation.profilePhoto.split("/").pop().split(".")[0]; 
            //Then use the destroy function to delete the previous photo from cloudinary
            // Reference: https://cloudinary.com/documentation/deleting_assets_tutorial
              await cloudinary.uploader.destroy(publicId); 
            }
            //Get the new url for the new image posted in the cloudinary
            profileinformation.profilePhoto = req.file.path
          }
          //Save the updated information in the database
          await profileinformation.save();
        //If the data is updated succesfully show this message
        return res.status(200).json({message: "Profile is successfully updated"})
    } catch (error) {
      //If an error occurred and the data can not be updated show this message
        console.log(error)
        return res.status(400).json({message: "Server Error. Profile cannot be updated. Please try again Later"})
    }   
}

//Creating the deleteprofile function
export const deleteprofile = async(req, res) => {
    //Getting the profileId using the req.params
    const {profileId} = req.params;
    try{
        //Find the specific profile to be deleted using the profileId
        const profileinformation = await profileModel.findById(profileId);
        //If there is no profile with that id show this message to the user
        if(!profileinformation){
            return res.status(404).json({message: "You do not have a Profile"})
        }
          //Delete the profile from database using the profileId 
          await profileinformation.deleteOne({ profileId })
        //If the profile is deleted succesfully show this message
        return res.status(200).json({message: "Profile is successfully Deleted"})
    } catch (error) {
        //If an error occurred and the profile can not be deleted show this message
        console.log(error)
        return res.status(400).json({message: "Server error. Profile can not be Deleted. Please try again later."})
    }
}