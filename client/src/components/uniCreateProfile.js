//import React and useState library
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import link and useNavigate from the react-router-dom
import { useNavigate } from "react-router-dom";
//importing the style sheet
import "../styling/unicreateprofile.css"

//creating uniProfile function
const UniProfile = () => {
  //Using the Usestate to add the state variables to components
    const[universityProfilePhoto, setuniversityProfilePhoto] = useState(null)
    const[universityProfile, setuniversityProfile] = useState({
        universityName: "",
        universityLocation: "",
        universityWebsite: "",
        universityEmail: "",
        universityDescription: "",
    })
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

  //Checking if the university profile exist
  useEffect(() => {
    const ProfileCheck = async() => {
      const res = await Axios.get("http://localhost:4000/universityprofile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UniversityLoginToken")}`
        } 
      })
      console.log(res.data)
      //if the profile exist navigate to the profile page
      if(res.data.length > 0) {
        navigate("/university/profile")
      }else {
        navigate("/university/createprofile")
      }
    }
    ProfileCheck();
  }, [navigate])

//Creating a handlechange function for onChange in the form
const handlechange = (e) => {
    //preventing the browser from submitting the form
    e.preventDefault();
    setuniversityProfile({...universityProfile, [e.target.name]: e.target.value})
}

//making a handlesubmit function
const handleSubmit = async (e) => {
  //preventing the browser from submitting the form
  e.preventDefault();
  //setting the message to empty
  setmessage("")

  const formData = new FormData();
 //appending the data to send to the server side
  if(universityProfilePhoto){
  formData.append("universityProfilePhoto", universityProfilePhoto);
  }
  formData.append("universityName", universityProfile.universityName);
  formData.append("universityLocation", universityProfile.universityLocation);
  formData.append("universityWebsite", universityProfile.universityWebsite);
  formData.append("universityEmail", universityProfile.universityEmail);
  formData.append("universityDescription", universityProfile.universityDescription);

  try {
    //using the post method to send the request to post the appended data to the following link on the server side
    const res = await Axios.post("http://localhost:4000/universityprofile/create",formData, {
        headers: {
          //getting the generated jwt token from login for authorisation
          "Authorization": `Bearer ${localStorage.getItem('UniversityLoginToken')}`,
          //using this to send the image as part of the form to the server data
          "Content-Type": "multipart/form-data"
        }
      })
      //once profile is created set all input fields to emplty
      setuniversityProfile({
        universityName: "",
        universityLocation: "",
        universityWebsite: "",
        universityEmail: "",
        universityDescription: "",
    })
    //Getting the message from backend to show the university
    setmessage(res.data.message); 
    navigate("/university/profile")
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot create your profile");
  }
}

//Creating the input form
  return(
    <div className="universityprofilePage">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
    <form onSubmit={handleSubmit}>
      <h1 className="Title">University Profile</h1>
      <div className="universityProfilePhoto">
        <label htmlFor="universityProfilePhoto" className="textfield">
          University Profile Photo:
        </label>
        <input
          name="universityProfilePhoto"
          type="file"
          onChange={(e) => setuniversityProfilePhoto(e.target.files[0])}
          accept=".png, .jpeg, .jpg"
        />
      </div>
      <div className="universityNamefield">
        <label htmlFor="universityName" className="textfield">
          University Name:
        </label>
        <input
          placeholder="Enter University Name"
          type="text"
          name="universityName"
          value = {universityProfile.universityName}
          className="inputfield"
          onChange={handlechange}
          required
        />
      </div>
      <div className="universityLocationfield">
        <label htmlFor="universityLocation" className="textfield">
          University Location:
        </label>
        <input
          placeholder="Enter University Location"
          type="text"
          name="universityLocation"
          value = {universityProfile.universityLocation}
          className="inputfield"
          onChange={handlechange}
          required
        />
      </div>
      <div className="universityWebsitefield">
        <label htmlFor="universityWebsite" className="textfield">
          University Website:
        </label>
        <input
          placeholder="Enter University Website"
          type="text"
          name="universityWebsite"
          value = {universityProfile.universityWebsite}
          className="inputfield"
          onChange={handlechange}
          required
        />
      </div>
      <div className="universityEmailfield">
        <label htmlFor="universityEmail" className="textfield">
          University Email:
        </label>
        <input
          placeholder="Enter University Email"
          type="email"
          name="universityEmail"
          value = {universityProfile.universityEmail}
          className="inputfield"
          onChange={handlechange}
          required
        />
      </div>
      <div className="universityDescriptionfield">
        <label htmlFor="universityDescription" className="textfield">
          University Description:
        </label>
        <input
          placeholder="Enter University Description"
          type="text"
          name="universityDescription"
          value = {universityProfile.universityDescription}
          className="inputfield"
          onChange={handlechange}
          required
        />
      </div>
      <div className="registerbutton">
        <button className="SubmitButton">Create university Profile</button>
      </div>
      {
        //Message to display to the universities
      }
      <div className="message for user">{message}</div>
    </form>
  </div>
  );
}; 

//exporting the uniProfile function for use
export default UniProfile;
