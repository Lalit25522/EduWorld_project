//import React, useState, useEffect library
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import link and useNavigate from the react-router-dom
import {useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/forgotPassword.css";
//importing the logo
import Logo from "../logo/EduWorldo.png"

//creating the ForgotPassword function
const ForgotPassword = () => {
  //Using the Usestate to add the state variables to components
  const[email, setEmail] = useState("");
  const[message, setmessage] = useState("")
  const navigate = useNavigate();

  useEffect(()=> {
    //getting the studentToken from localstorage
    const studentToken = localStorage.getItem("StudentLoginToken");
            
    //If the token exist redirect to the create profile page
    if(studentToken) {
      navigate("/student/createprofile")
    }
  }, [navigate])

//making a handlesubmit function
const handleSubmit = async(e) => {
  //preventing the browser from submitting the form
  e.preventDefault();
  //setting the message to empty
  setmessage("")
  try {
     //using the post method to send the request to post the email to the following link on the server side
    const res = await Axios.post("http://localhost:4000/student/forgotpassword", {email})
    //Getting the message from backend to show the users
    setmessage(res.data.message); 
    //once logged in set both email input field to empty
    setEmail("")
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot login the user");
  }
}
              
//Creating the input form
return (
    <div className="forgotPasswordPage">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
      <div className = "Logofield">
        <img className = "Logo" src = {Logo} alt = "Logo"/>
      </div>
      <form className="forgotPasswordform" onSubmit={handleSubmit}>
        <h1 className="forgotTitle">Forgot Password</h1>
        <div className="emailfield">
          <label htmlFor="email" className="forgottextfield">
            Please Enter you email:
          </label>
          <input
            placeholder="Enter Email Address"
            name="email"
            type="email"
            value = {email}
            className="inputfield"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="loginbutton">
          <button className="SubmitButton">Send Email</button>
        </div>
        {
          //Message to display to the users
        }
        <div className="message for user">{message}</div>
      </form>
    </div>
  );
};

//exporting the ForgotPassword function for use
export default ForgotPassword;