// importing application Model from the models
import applicationModel from "../models/Application.js"
// importing cloudinary from the cloudinary
import { v2 as cloudinary } from "cloudinary";

//creating the createApplication function
export const createApplication = async(req, res) => {
    //Extract the courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements and tuitionFees from the req.body
    const {courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements, tuitionFees} = req.body;
    //Set the universityId which will take the req.universityId parameter
    //req.universityId will get the universityId from the decoded jwt token
    const universityId = req.universityId

    try{
        //creating a new instance newApplication using the application Model and passing the courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements, tuitionFees, applicationPicture and universityId to link it to objectId of certain university login credentials
        console.log(req.body)
        const newApplication = new applicationModel({courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements, tuitionFees, applicationPicture: req.file.path, university: universityId})
        //Saving the newApplication to the database
        await newApplication.save();
        //If the application is successfully created show this message
        return res.status(200).json({message: "Thank you for creating a Course"})
    } catch (error){
        //If the application cannot be created show this message
        console.log(error)
        return res.status(400).json({message: "Server Error. Course can not be created. Please try again later."})
    }
}

//Creating the getallapplications function
export const getallapplications = async(req, res) => {
    try{
    // Trying to get all the applications from the database
    const applications = await applicationModel.find();
    //If there is no applications show this message
    if(!applications){
        return res.status(404).json({message: "There are no courses to show"})
    }
    //If the application exist pass the application information to the client
    res.json(applications);
    } catch (error){
        //If application cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Courses can not be retrieved. Please try again later"})
    }
}

//Creating the getmyapplications function
export const getmyapplications = async(req, res) => {
    try{
     // Trying to get the applications that are associated with a certain university using its universityId
    const uniApplications = await applicationModel.find({university: req.universityId});
    //If there are no applications show this message
    if(!uniApplications){
        return res.status(404).json({message: "Your University haven't posted any courses yet."})
    }
    //If the application exist pass the uniApplications information to the client
    res.json(uniApplications);
    } catch (error){
        //If applications cannot be retrieved from the database show this error
        return res.status(400).json({message: "Server Error. Your University courses can not be retrieved. Please try again later."})
    }
  }
  
  //Creating the updateapplications function
  export const updateapplications = async (req, res) => {
    //Getting the applicationId using the req.params
    const {applicationId} = req.params;
    //Extract the courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements and tuitionFees from the req.body
    const {courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements, tuitionFees} = req.body;
  
    try{
         //Find the specific application to be edited using the applicationId
        const uniApplicationinformation = await applicationModel.findById(applicationId);
        //If there is no application with that id show this message to the university
        if(!uniApplicationinformation){
            return res.status(404).json({message: "Your University do not have a course with this Id"})
        }
        
        //Updating the information with the new information from the update form
        uniApplicationinformation.courseName = courseName;
        uniApplicationinformation.courseOverview = courseOverview;
        uniApplicationinformation.courseDetails = courseDetails;
        uniApplicationinformation.careerOpportunities = careerOpportunities;
        uniApplicationinformation.entryRequirements = entryRequirements;
        uniApplicationinformation.tuitionFees = tuitionFees;

        //If the photo in the update form already exist 
        if (req.file) {
            //The university enters a new image in update form 
            if (uniApplicationinformation.applicationPicture) {
            //Get the publicId of the photo from the cloudinary URL
            // Reference: https://stackoverflow.com/questions/71529154/extract-public-id-from-cloudinary-url
                const publicId = uniApplicationinformation.applicationPicture.split("/").pop().split(".")[0];
            //Then use the destroy function to delete the previous photo from cloudinary 
            // Reference: https://cloudinary.com/documentation/deleting_assets_tutorial
                await cloudinary.uploader.destroy(publicId); 
            }
            //Get the new url for the new image posted in the cloudinary
            uniApplicationinformation.applicationPicture = req.file.path
        }
          //Save the updated information in the database
          await uniApplicationinformation.save();
          //If the data is updated succesfully show this message
        return res.status(200).json({message: "Course is successfully updated"})
    } catch (error) {
        //If an error occurred and the data can not be updated show this message
        console.log(error)
        return res.status(400).json({message: "Server Error. Course cannot be updated. Please try again Later"})
    }   
  }
  
  //Creating the deleteapplications function
  export const deleteapplications = async(req, res) => {
    //Getting the applicationId using the req.params
    const {applicationId} = req.params;
    try{
        //Find the specific application to be deleted using the applicationId
        const uniApplicationinformation = await applicationModel.findById(applicationId);
        //If there is no application with that id show this message to the university
        if(!uniApplicationinformation){
            return res.status(404).json({message: "Your University do not have a course with this Id"})
        }
          //Delete the application from database using the applicationId
          await uniApplicationinformation.deleteOne({ applicationId })
        //If the application is deleted succesfully show this message
        return res.status(200).json({message: "Course is successfully Deleted"})
    } catch (error) {
        //If an error occurred and the application can not be deleted show this message
        console.log(error)
        return res.status(400).json({message: "Server error. Course can not be Deleted. Please try again later"})
    }
  }