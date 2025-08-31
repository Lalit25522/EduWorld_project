//importing the university profile Model
import universityprofileModel from "../models/universityProfile.js"
//importing the cloudinary library
import { v2 as cloudinary } from "cloudinary";

//creating the university profile function
export const universityProfile = async(req,res) => {
  //Extract the universityName, universityLocation, universityWebsite, universityEmail and universityDescription from the req.body
  const {universityName, universityLocation, universityWebsite, universityEmail, universityDescription} = req.body;
  //Set the universityId which will take the req.universityId parameter
  //req.universityId will get the universityId from the decoded jwt token
  const universityId = req.universityId

    try{
    //creating a new instance newUniversityProfile using the university proile Model and passing the universityProfilePhoto, universityName, universityLocation, universityWebsite, universityEmail, universityDescription and universityId to link it to objectId of certain university login credentials
    const newUniversityProfile = new universityprofileModel({universityProfilePhoto: req.file.path, universityName, universityLocation, universityWebsite, universityEmail, universityDescription, university: universityId});
    //Saving the newUniversityProfile to the database
    await newUniversityProfile.save();
    //If the university profile is successfully created show this message
    return res.status(200).json({ message: "The University Profile has been successfully created"});
    } catch (error) {
      //If the university profile cannot be created show this message
      return res.status(400).json({ message: "Server Error. Could not create a new university profile. Please try again later"});
    }
}

//Creating the getuniprofile function
export const getuniprofile = async(req, res) => {
  try{
    // Trying to get the profile that is associated with a certain university using its universityId
  const uniprofile = await universityprofileModel.find({university: req.universityId});
  //If there is no profile show this message
  if(!uniprofile){
      return res.status(404).json({message: "Your University don't have a profile yet"})
  }
  //If the profile exist pass the uniprofile information to the client
  res.json(uniprofile);
  } catch (error){
      //If university profile cannot be retrieved from the database show this error
      return res.status(400).json({message: "Server Error. University Profile can not be retrieved. Please try again later."})
  }
}

//Creating the updateuniprofile function
export const updateuniprofile = async (req, res) => {
  //Getting the universityprofileId using the req.params
  const {universityprofileId} = req.params;
  //Extract the universityName, universityLocation, universityWebsite, universityEmail and universityDescription from the req.body
  const {universityName, universityLocation, universityWebsite, universityEmail, universityDescription} = req.body;
  //Set the universityId which will take the req.universityId parameter
  //req.universityId will get the universityId from the decoded jwt token
  const universityId = req.universityId

  try{
      //Find the specific profile to be edited using the universityprofileId
      const uniprofileinformation = await universityprofileModel.findById(universityprofileId);
      //If there is no profile with that id show this message to the university
      if(!uniprofileinformation){
          return res.status(404).json({message: "Your University Profile does not exist"})
      }

      //Updating the information with the new information from the update form
      uniprofileinformation.universityName = universityName;
      uniprofileinformation.universityLocation = universityLocation;
      uniprofileinformation.universityWebsite = universityWebsite;
      uniprofileinformation.universityEmail = universityEmail;
      uniprofileinformation.universityDescription = universityDescription;

      //If the photo in the update form already exist 
      if (req.file) {
      //The university enters a new image in update form 
          if (uniprofileinformation.universityProfilePhoto) {
          //Get the publicId of the photo from the cloudinary URL
          // Reference: https://stackoverflow.com/questions/71529154/extract-public-id-from-cloudinary-url
            const publicId = uniprofileinformation.universityProfilePhoto.split("/").pop().split(".")[0]; 
          //Then use the destroy function to delete the previous photo from cloudinary
          // Reference: https://cloudinary.com/documentation/deleting_assets_tutorial
            await cloudinary.uploader.destroy(publicId); 
          }
          //Get the new url for the new image posted in the cloudinary
          uniprofileinformation.universityProfilePhoto = req.file.path
        }
        //Save the updated information in the database
        await uniprofileinformation.save();
        //If the data is updated succesfully show this message
      return res.status(200).json({message: "University Profile is successfully updated"})
  } catch (error) {
    //If an error occurred and the data can not be updated show this message
      console.log(error)
      return res.status(400).json({message: "Server Error. University Profile cannot be updated. Please try again Later"})
  }   
}

//Creating the deleteuniprofile function
export const deleteuniprofile = async(req, res) => {
  //Getting the universityprofileId using the req.params
  const {universityprofileId} = req.params;
  //Set the universityId which will take the req.universityId parameter
  //req.universityId will get the universityId from the decoded jwt token
  const universityId = req.universityId
  try{
    //Find the specific profile to be deleted using the universityprofileId
      const uniprofileinformation = await universityprofileModel.findById(universityprofileId);
      //If there is no profile with that id show this message to the university
      if(!uniprofileinformation){
          return res.status(404).json({message: "Your University don't have a profile yet"})
      }
      //Delete the profile from database using the universityprofileId
        await uniprofileinformation.deleteOne({ _id: universityprofileId })
      //If the profile is deleted succesfully show this message
      return res.status(200).json({message: "University Profile is successfully Deleted"})
  } catch (error) {
    //If an error occurred and the profile can not be deleted show this message
      console.log(error)
      return res.status(400).json({message: "Server error. University Profile can not be Deleted. Please try again later"})
  }
}