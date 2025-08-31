//import React and useState library
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import link and useNavigate from the react-router-dom
import {Link, useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/uniLogin.css";
//importing the logo
import Logo from "../logo/EduWorldo.png"

//creating the unilogin function
const UniLogin = () => {
  //Using the Usestate to add the state variables to components
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[message, setmessage] = useState("")
  const navigate = useNavigate();
  
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
    //using the post method to send the request to post the email and password to the following link on the server side
    const res = await Axios.post("http://localhost:4000/university/login", {email, password})
    //setting a jwt token if the login is successful
    if(res.data.jwttoken){
      localStorage.setItem('UniversityLoginToken', res.data.jwttoken)
      //once the university is logged in navigate to the following link
      navigate("/university/createprofile")
    }else{
      //Getting the message from backend to show the university
      setmessage(res.data.message); 
    }
    //once logged in set both email and password input field to empty
    setEmail("")
    setPassword("")
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot login the university");
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
        <h1 className="Title">Uni Login</h1>
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
          <a href="/university/forgotpassword">
            Forgot Password
          </a>
        </div>
        <div className="loginbutton">
          <button className="SubmitButton">Login to your Account</button>
        </div>
        <div className="loginPage">
          <Link to="/university/register">
            <button className="account" href="/university/register">
              Don't have an account
            </button>
          </Link>
        </div>
        {
          //Message to display to the university
        }
        <div className="message for user">{message}</div>
      </form>
    </div>
  );
};

//exporting the uniLogin function for use
export default UniLogin;