//import React, useState, useEffect from react
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import useNavigate from the react-router-dom
import {useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/application.css"

//creating application function
const Application = () => {
   //Using the Usestate to add the state variables to components
  const[courseName, setcourseName] = useState("");
  const[courseOverview, setcourseOverview] = useState("");
  const[courseDetails, setcourseDetails] = useState("");
  const[careerOpportunities, setcareerOpportunities] = useState("");
  const[entryRequirements, setentryRequirements] = useState("");
  const[tuitionFees, settuitionFees] = useState("");
  const[applicationPicture, setapplicationPicture] = useState(null)
  const[message, setmessage] = useState("")
  const navigate = useNavigate();
  
  useEffect(()=> {
    //getting the universitytoken from localstorage
    const universityToken = localStorage.getItem("UniversityLoginToken");
          
    //If the token doesn't exist redirect to the login page
    if(!universityToken) {
      navigate("/university/login")
    }
  }, [navigate])

  //making a handlesubmit function
  const handleSubmit = async (e) => {
    //preventing the browser from submitting the form
    e.preventDefault();

    //appending the data to send to the server side
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("courseOverview", courseOverview);
    formData.append("courseDetails", courseDetails);
    formData.append("careerOpportunities", careerOpportunities);
    formData.append("entryRequirements", entryRequirements);
    formData.append("tuitionFees", tuitionFees);
    if(applicationPicture){
      formData.append("applicationPicture", applicationPicture)
    }
    //setting the message to be empty
    setmessage("")
    try {
      //using the post method to send the request to post the appended data to the following link on the server side
      const res = await Axios.post("http://localhost:4000/application/create", formData, {
        headers: {
          //getting the generated jwt token from login for authorisation
          "Authorization": `Bearer ${localStorage.getItem("UniversityLoginToken")}`,
          //using this to send the image as part of the form to the server data
          "Content-Type": "multipart/form-data"
        }
      })
      //once the profile is created navigate to the following link
      navigate("/application")
      //Getting the message from backend to show the university
      setmessage(res.data.message); 

    } catch (error) {
      // show the error message in case something goes wrong
      setmessage("Server Error. Cannot create Your Application");
    }
  }

  //Creating the input form
  return(
    <div className="Appliction">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
    <form onSubmit={handleSubmit}>
      <h1 className="Title">Create Course Page</h1>
      <div className="courseName">
        <label htmlFor="courseName" className="textfield">
          Name of the Course:
        </label>
        <input
          placeholder="Enter Course Name"
          name="courseName"
          type="text"
          value={courseName}
          className="inputfield"
          onChange={(e) => setcourseName(e.target.value)}
          required
        />
      </div>
      <div className="courseOverview">
        <label htmlFor="courseOverview" className="textfield">
          Course Overview:
        </label>
        <input
          placeholder="Enter Course Overview"
          name="courseOverview"
          type="text"
          value={courseOverview}
          className="inputfield"
          onChange={(e) => setcourseOverview(e.target.value)}
          required
        />
      </div>
      <div className="courseDetails">
        <label htmlFor="courseDetails" className="textfield">
          Course Details:
        </label>
        <input
          placeholder="Enter Course Details"
          name="courseDetails"
          type="text"
          value={courseDetails}
          className="inputfield"
          onChange={(e) => setcourseDetails(e.target.value)}
          required
        />
      </div>
      <div className="careerOpportunities">
        <label htmlFor="careerOpportunities" className="textfield">
          Career Opportunities:
        </label>
        <input
          placeholder="Enter Career Opportunities"
          name="careerOpportunities"
          type="text"
          value={careerOpportunities}
          className="inputfield"
          onChange={(e) => setcareerOpportunities(e.target.value)}
          required
        />
      </div>
      <div className="entryRequirements">
        <label htmlFor="entryRequirements" className="textfield">
          Entry Requirements:
        </label>
        <input
          placeholder="Enter Entry Requirements"
          name="entryRequirements"
          type="text"
          value={entryRequirements}
          className="inputfield"
          onChange={(e) => setentryRequirements(e.target.value)}
          required
        />
      </div>
      <div className="tuitionFees">
        <label htmlFor="tuitionFees" className="textfield">
          Tuition Fees for the course:
        </label>
        <input
          placeholder="Enter Tuition fees"
          name="tuitionFees"
          type="text"
          value={tuitionFees}
          className="inputfield"
          onChange={(e) => settuitionFees(e.target.value)}
          required
        />
      </div>
      <div className="applicationPicture">
        <label htmlFor="applicationPicture" className="textfield">
          Application Photo:
        </label>
        <input
          name="applicationPicture"
          type="file"
          onChange={(e) => setapplicationPicture(e.target.files[0])}
          accept=".png, .jpeg, .jpg"
        />
      </div>
      
      <div className="applicationbutton">
        <button className="SubmitButton">Submit Course</button>
      </div>
      {
        //Message to display to the universities
      }
      <div className="message for user">{message}</div>
    </form>
  </div>
  );
}; 

//exporting the Application function for use
export default Application;
