//import React, useState and useeffect from react
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
// import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";
//importing the style sheet
import "../styling/uniRegisterForm.css";
//importing the logo
import Logo from "../logo/EduWorldo.png"

//Creating register function
const Register = () => {
  //Using the Usestate to add the state variables to components
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[message, setmessage] = useState("")
  const navigate = useNavigate();
    
  useEffect(()=> {
    //getting the universitytoken from localstorage
    const universityToken = localStorage.getItem("UniversityLoginToken");
       
    //If the token doesn't exist redirect to the login page
    if(universityToken) {
      navigate("/university/createprofile")
    }
  }, [navigate])

//making a handlesubmit function
const handleSubmit = async (e) => {
  //preventing the browser from submitting the form
  e.preventDefault();
  //setting the message to empty
  setmessage("")
  try {
    //using the post method to send the request to post the email and password to the following link on the server side
    const res = await Axios.post("http://localhost:4000/university/registerform", {email, password})
    //Getting the message from backend to show the university
    setmessage(res.data.message); 
    //once registered set both email and password input field to emplty
    setEmail("")
    setPassword("")
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server error. Cannot register the university");
  }
}

//Creating the input form
  return(
    <div className="Registerpage">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
      <div className = "Logofield">
        <img className = "Logo" src = {Logo} alt = "Logo"/>
      </div>
      <form className="Registerform" onSubmit={handleSubmit}>
        <h1 className="Title">Uni Register</h1>
        <div className="emailfield">
          <label htmlFor="email" className="textfield">
            Email:
          </label>
          <input
            placeholder="Enter Email Address"
            name="email"
            type="email"
            value={email}
            className="inputfield"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="passwordfield">
          <label htmlFor="password" className="textfield">
            Password:
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
        <div className="registerbutton">
          <button className="SubmitButton">Register Your Account</button>
        </div>
        {
          //Message to display to the universities
        }
        <div className="message for user">{message}</div>
      </form>
    </div>
  );
}; 

//exporting register function for use
export default Register;
