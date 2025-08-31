//import React, useState, useEffect library
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import link and useNavigate from the react-router-dom
import {useNavigate, useParams} from "react-router-dom"
//importing the style sheet
import "../styling/resetPassword.css";

//creating the VerifyEmail function
const VerifyEmail = () => {
  //Using the Usestate to add the state variables to components
  const[message, setmessage] = useState("")
  const navigate = useNavigate();
  const {verifyToken} = useParams();

  useEffect(()=> {
    //getting the studentToken from localstorage
    const studentToken = localStorage.getItem("StudentLoginToken");
            
    //If the token exist redirect to the create profile page
    if(studentToken) {
      navigate("/student/createprofile")
    }
  }, [navigate])

  useEffect(() => {
    const verifyyouremail = async () => {
        try {
            //using the post method to send the request to post the new password to the following link on the server side
           const res = await Axios.post("http://localhost:4000/student/verifyemail", {verifyToken})
           //Getting the message from backend to show the users
           setmessage(res.data.message); 
         } catch (error) {
           // show the error message in case something goes wrong
           setmessage("The email cannot be verified");
         }
    }
    if(verifyToken) {
        verifyyouremail();
    }
  }, [verifyToken])

  return (
    <div className = "verificationpage">
        <h1 className="resetTitle">Verify Email</h1>
        <div className="message for user">{message}</div>
    </div>
  )

}

//exporting the VerifyEmail function for use
export default VerifyEmail;