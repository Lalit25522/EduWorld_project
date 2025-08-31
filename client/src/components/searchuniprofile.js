//import React, useState and useeffect from react
import React, {useState, useEffect} from "react";
//import useParams library from react-router-dom
import {useParams, useNavigate} from "react-router-dom"
//import the axios library
import axios from "axios";
//importing the style sheet
import "../styling/searchprofile.css"

//Create the SearchProfiles function
const SearchProfiles = () => {
    //Using the Usestate to add the state variables to components
    const [searchProfile, setSearchProfile] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=> {
        const studentToken = localStorage.getItem("StudentLoginToken");
        //If the token doesn't exist redirect to the login page        
        if(!studentToken) {
            navigate("/student/login")
        }
        //getting the studentToken from localstorage
    }, [navigate])

    //Getting the profileId from the URL using the useParamas
    const {universityprofileId} = useParams();

     //Using the useeffect to fetch the searched profile
    useEffect(() => {
        retrieveSearchProfile()
    }, [universityprofileId]);
        
    //Creating the retrieveSearchProfile function
    const retrieveSearchProfile = async () => {
        try {
            //Getting the searched profile by sending the request through the following link from the server side with the specified profileId
            const res = await axios.get(`http://localhost:4000/studentprofile/uni/${universityprofileId}`, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            console.log(res)
            //updating the searchProfile state with searched profile data from the server
            setSearchProfile(res.data);
        } catch (error) {
            console.log(error)
            //If something goes wrong show this error to the user
            setMessage("Server Error. Cannot Show University Profile");
        }
    };

    return(
        <div className = "Profilepage">
            {
                //showing the profile data from the database
            }
            <div className = "profile">
                {<img className = "profilephoto" src={searchProfile.universityProfilePhoto} alt="profilePhoto"/>}
            </div>
            <div className= "name">
                <h1 className= "fullname">{searchProfile.universityName}</h1>
            </div>
            {
                //only showing the field if it not empty
            }
            <div className= "showdetails">
                <h2>University Location:</h2>
                <p className = "infotext">{searchProfile.universityLocation}</p>
            </div>
            <div className="showdetails">
                <h2>University Website</h2>
                <p className = "infotext">{searchProfile.universityWebsite}</p>
            </div>
            <div className="showdetails" >
                <h2>University Email</h2>
                <div>
                    <p className = "infotext">{searchProfile.universityEmail}</p>
                </div>
            </div>
            <div className="showdetails" >
                <h2>University Description: </h2>
                <p className = "infotext">{searchProfile.universityDescription}</p>
            </div>
            <button className = "Message"> Message </button>
            {
                //Showing the messages to the user
            }
            <div className="message for user">{message}</div>
        </div>        
    )
}

//exporting the SearchProfiles function for use
export default SearchProfiles;