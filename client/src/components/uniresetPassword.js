//import React, useState, useEffect library
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import link and useNavigate from the react-router-dom
import {useNavigate, useParams} from "react-router-dom"
//importing the style sheet
import "../styling/resetPassword.css";
//importing the logo
import Logo from "../logo/EduWorldo.png"

//creating the UniResetPassword function
const UniResetPassword = () => {
  //Using the Usestate to add the state variables to components
  const[password, setPassword] = useState("");
  const[message, setmessage] = useState("")
  const navigate = useNavigate();
  const {resetToken} = useParams();

useEffect(()=> {
    //getting the universitytoken from localstorage
    const universityToken = localStorage.getItem("UniversityLoginToken");
                    
    //If the token does exist redirect to the login page
    if(universityToken) {
        navigate("/university/createprofile")
    }
}, [navigate])

//making a handlesubmit function
const handleSubmit = async(e) => {
  //preventing the browser from submitting the form
  e.preventDefault();
  //setting the message to empty
  setmessage("")
  try {
     //using the post method to send the request to post the new password to the following link on the server side
    const res = await Axios.post("http://localhost:4000/university/resetPassword", {resetToken, password})
    //Getting the message from backend to show the users
    setmessage(res.data.message); 
    //once logged in set both email input field to empty
    setPassword("")
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot login the user");
  }
}
              
//Creating the input form
return (
    <div className="resetPasswordPage">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
      <div className = "Logofield">
        <img className = "Logo" src = {Logo} alt = "Logo"/>
      </div>
      <form className="resetPasswordform" onSubmit={handleSubmit}>
        <h1 className="resetTitle">Uni Reset Password</h1>
        <div className="passwordfield">
          <label htmlFor="password" className="resettextfield">
            New Password:
          </label>
          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            value = {password}
            className="inputfield"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="loginbutton">
          <button className="SubmitButton">Reset Password</button>
        </div>
        {
          //Message to display to the users
        }
        <div className="message for user">{message}</div>
      </form>
    </div>
  );
};

//exporting the UniResetPassword function for use
export default UniResetPassword;