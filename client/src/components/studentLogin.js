//import React, useState, useEffect library
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import link and useNavigate from the react-router-dom
import {Link, useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/studentLogin.css";
//importing the logo
import Logo from "../logo/EduWorldo.png"

//creating the Login function
const Login = () => {
  //Using the Usestate to add the state variables to components
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
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
     //using the post method to send the request to post the email and password to the following link on the server side
    const res = await Axios.post("http://localhost:4000/student/login", {email, password})
    //Getting the message from backend to show the users
    setmessage(res.data.message); 
    //setting a jwt token if the login is successful
    if(res.data.jwttoken){
      localStorage.setItem('StudentLoginToken', res.data.jwttoken)
      //once the user is logged in navigate to the following link
      navigate("/student/createprofile")
    } else {
      //else giving this error message
      setmessage(res.data.message)
    }
    //once logged in set both email and password input field to empty
    setEmail("")
    setPassword("")
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot login the user");
  }
}
              
//Creating the input form
return (
    <div className="Loginpage">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
      <div className = "Logofield">
        <img className = "Logo" src = {Logo} alt = "Logo"/>
      </div>
      <form className="Loginform" onSubmit={handleSubmit}>
        <h1 className="Title">Login</h1>
        <div className="emailfield">
          <label htmlFor="email" className="textfield">
            Email:
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
        <div className="LoginPage">
          <a href="/student/forgotpassword">
            Forgot Password
          </a>
        </div>
        <div className="loginbutton">
          <button className="SubmitButton">Login to your Account</button>
        </div>
        <div className="LoginPage">
          <Link to="/student/register">
            <button className="account" href="/student/register">
              Don't have an account
            </button>
          </Link>
        </div>
        {
          //Message to display to the users
        }
        <div className="message for user">{message}</div>
      </form>
    </div>
  );
};

//exporting the Login function for use
export default Login;