//import React, useState and useeffect from React
import React, { useState, useEffect } from 'react';
//import Link and useNavigate library from the react-router-dom
import { Link, useNavigate } from 'react-router-dom';
//import the axios library
import Axios from 'axios';
//importing the style sheet
import "../styling/nav.css"

//Create the Navigation function
const Navigation = () => {
    //Using the Usestate to add the state variables to components
    const [userloggedin, setuserloggedin] = useState("");
    const [universityloggedin, setuniversityloggedin] = useState("");
    const [firstName, setFirstName] = useState("")
    const[message, setmessage] = useState("")
    const [profiles, setProfiles] = useState({searchresult:[], unisearchresult:[]});
    const navigate = useNavigate();

    //get the student and university Token from the storage 
    useEffect(() => {
        const studentToken = localStorage.getItem("StudentLoginToken");
        const universityToken = localStorage.getItem("UniversityLoginToken");
        if(studentToken) {
            setuserloggedin(studentToken)
        }
        if(universityToken){
            setuniversityloggedin(universityToken)
        }
    })

    //create the logout by removing the student token
    const handleuserlogout = () => {
        localStorage.removeItem("StudentLoginToken");
        setuserloggedin("");
        navigate("/student/login")
    }

    //create the logout by removing the university token
    const handleuniversitylogout = () => {
        localStorage.removeItem("UniversityLoginToken");
        setuniversityloggedin("");
        navigate("/university/login")
    }

    //creating a handlesearch function
    const handleSearch = async(e) => {
        //preventing the browser from searching the form
        e.preventDefault();
        //setting the message to empty 
        setmessage("")

        //passing the firstName to the backend through the url
        try {
            const res = await Axios.get(`http://localhost:4000/studentprofile/Search?firstName=${firstName}`, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem('StudentLoginToken')}`}
            })
            //setting the message to show the user
            setmessage(res.data.message); 
            //updating the setProfile state with profile data from the server
            setProfiles(res.data)
        } catch(error) {
            //If something goes wrong show this error to the user
            setmessage("Server error");
        }
    }

    //creating a function for message button to naviagte to the message page
    const handlesendmessagebutton = (receiverId) => {
        navigate(`/message/${receiverId}`)
    }

    //creating the navigation
    return(
        <nav className="navigation">
            <ul className="List">
                {
                    //If the user is logged in show this nav bar
                }
                {userloggedin ? (
                    <>
                        <li className="Item"><a href = "/student/profile" className= "nav"> Profile </a></li>
                        <li className="Item">
                            {
                                //creating a input field to add firstName or university name to search
                            }
                            <form className="Item" onSubmit={handleSearch}>
                                <input 
                                    placeholder="Enter First Name or Uni Name"
                                    name="firstName"
                                    type="text"
                                    value = {firstName}
                                    className="searchbar"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <button className="searchbutton">Search</button>
                            </form>
                        </li>
                        {
                            //creating a drop down menu
                        }
                        <li className="Item">
                            <a href = "/post" className= "dropdown"> Posts </a>
                            <ul className="dropdownmenu">
                                <li className = "dropdownitem"><a href = "/post/create" className= "nav"> Create Posts </a></li>
                                <li className = "dropdownitem"><a href = "/mypost" className= "nav"> My Posts </a></li>
                            </ul>
                        </li>
                        <li className="Item">
                            <a href = "/article" className= "dropdown"> Articles </a>
                            <ul className="dropdownmenuarticle">
                                <li className = "dropdownitem"><a href = "/article/create" className= "nav"> Create Articles </a></li>
                                <li className = "dropdownitem"><a href = "/myarticle" className= "nav"> My Articles </a></li>
                            </ul>
                        </li>
                        <li className="Item"><a href = "/application" className= "nav"> Courses </a></li>
                        <li className="Item"><a href = "/message" className= "nav"> Messages </a></li>
                        {
                            //creating the logout button
                        }

                        <li className="Item">
                            <button className = "Logout" onClick={handleuserlogout}> Logout</button>
                        </li>
                        <div>
                            {
                                //if the array is not empty show the search result for user profile
                            }
                            {profiles.searchresult.length > 0 && (
                                <div>
                                    <h2>Profile Results</h2>
                                    <ul>
                                    {
                                        // 
                                    }
                                        {profiles.searchresult.map(profile => (
                                            <li key= {profile._id}>
                                                <Link to = {`/searchProfile/${profile._id}`}>
                                                    {profile.firstName} {profile.lastName}
                                                </Link>
                                                <button onClick={() => handlesendmessagebutton(profile._id)}>Send Message</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {
                                //if the array is not empty show the search result for university profile
                            }
                            {profiles.unisearchresult.length > 0 && (
                                <div>
                                    <h2>Profile Results</h2>
                                    <ul>
                                        {profiles.unisearchresult.map(universityprofile => (
                                            <li key= {universityprofile._id}>
                                                <Link to = {`/searchProfile/uni/${universityprofile._id}`}>
                                                    {universityprofile.universityName}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                    //if the university is logged in show the below nav abr
                ): universityloggedin ? (
                    <>
                        <li className="Item"><a href = "/university/profile" className= "nav"> Profile </a></li>
                        <li className="Item">
                            <a href = "/application" className= "dropdown"> Courses </a>
                            <ul className="dropdownmenuapplication">
                                <li className = "dropdownitem"><a href = "/application/create" className= "nav"> Create Course </a></li>
                                <li className = "dropdownitem"><a href = "/myapplication" className= "nav"> My Courses </a></li>
                            </ul>
                        </li>
                        <li className="Item">
                            <button className = "Logout" onClick={handleuniversitylogout}> Logout</button>
                        </li>
                    </>
                    //if neither the uni or user is logged in show this nav bar to both 
                ) : (
                    <>
                         <li className="Item"><Link className = "Link" to = "/student/register">Student Register</Link></li>
                         <li className="Item"><Link className = "Link" to = "/student/login"> Student Login</Link></li>
                         <li className="Item"><Link className = "Link" to = "/university/register">University Register</Link></li>
                         <li className="Item"><Link className = "Link" to = "/university/login">University Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}

//exporting the Navigation function for use
export default Navigation;