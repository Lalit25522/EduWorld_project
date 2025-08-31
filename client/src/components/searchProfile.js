//import React, useState, useEffect from react
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
        //getting the studentToken from localstorage
        const studentToken = localStorage.getItem("StudentLoginToken");
        //If the token doesn't exist redirect to the login page        
        if(!studentToken) {
            navigate("/student/login")
        }
    }, [navigate])

    //Getting the profileId from the URL using the useParamas
    const {profileId} = useParams();

     //Using the useeffect to fetch the searched profile 
    useEffect(() => {
        retrieveSearchProfile();
    }, [profileId]);
        
    //Creating the retrieveSearchProfile function
    const retrieveSearchProfile = async () => {
        try {
            //Getting the searched profile by sending the request through the following link from the server side with the specified profileId
            const res = await axios.get(`http://localhost:4000/studentprofile/${profileId}`, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            //updating the searchProfile state with searched profile data from the server
            setSearchProfile(res.data);
        } catch (error) {
            //If something goes wrong show this error to the user
            setMessage("Server Error. Cannot Show Searched Profile");
        }
    };

    return(
        <div className = "Profilepage">
            {
                //showing the profile data from the database
            }
            <div className = "profile">
                {<img className = "profilephoto" src={searchProfile.profilePhoto} alt="profilePhoto"/>}
            </div>
            <div className= "name">
                <h1 className= "fullname">{searchProfile.firstName} {searchProfile.lastName}</h1>
            </div>
            {
                //only showing the field if it not empty
            }
            <div className= "showdetails">
                <h2>About:</h2>
                {searchProfile.about && <p className = "infotext">{searchProfile.about}</p>}
            </div>
            <div className="showdetails">
                <h2>Highest Education</h2>
                {searchProfile.highestEducation && <p className = "infotext">{searchProfile.highestEducation}</p>}
            </div>
            <div className="showdetails" >
                <h2>Education Details</h2>
                <div>
                    {searchProfile.highschoolcourses && <p className = "infotext">{searchProfile.highschoolcourses}</p>}
                </div>
                <div>
                    {searchProfile.course1 && <p className = "infotext">{searchProfile.course1}</p>}
                </div>
                <div>
                    {searchProfile.grade1 && <p className = "infotext">{searchProfile.grade1}</p>}
                </div>
                <div>
                    {searchProfile.course2 && <p className = "infotext">{searchProfile.course2}</p>}
                </div>
                <div>
                    {searchProfile.grade2 && <p className = "infotext">{searchProfile.grade2}</p>}
                </div>
                <div>
                    {searchProfile.course3 && <p className = "infotext">{searchProfile.course3}</p>}
                </div>
                <div>
                    {searchProfile.grade3 && <p className = "infotext">{searchProfile.grade3}</p>}
                </div>
                <div>
                    {searchProfile.course4 && <p className = "infotext">{searchProfile.course4}</p>}
                </div>
                <div>
                    {searchProfile.grade4 && <p className = "infotext">{searchProfile.grade4}</p>}
                </div>
                <div>
                    {searchProfile.course5 && <p className = "infotext">{searchProfile.course5}</p>}
                </div>
                <div>
                    {searchProfile.grade5 && <p className = "infotext">{searchProfile.grade5}</p>}
                </div>
                <div>
                    {searchProfile.course6 && <p className = "infotext">{searchProfile.course6}</p>}
                </div>
                <div>
                    {searchProfile.grade6 && <p className = "infotext">{searchProfile.grade6}</p>}
                </div>
                <div>
                    {searchProfile.course7 && <p className = "infotext">{searchProfile.course7}</p>}
                </div>
                <div>
                    {searchProfile.grade7 && <p className = "infotext">{searchProfile.grade7}</p>}
                </div>
                <div>
                    {searchProfile.course8 && <p className = "infotext">{searchProfile.course8}</p>}
                </div>
                <div>
                    {searchProfile.grade8 && <p className = "infotext">{searchProfile.grade8}</p>}
                </div>
                <div>
                    {searchProfile.course9 && <p className = "infotext">{searchProfile.course9}</p>}
                </div>
                <div>
                    {searchProfile.grade9 && <p className = "infotext">{searchProfile.grade9}</p>}
                </div>
                <div>
                    {searchProfile.course10 && <p className = "infotext">{searchProfile.course10}</p>}
                </div>
                <div>
                    {searchProfile.grade10 && <p className = "infotext">{searchProfile.grade10}</p>}
                </div>
                <div>
                    {searchProfile.bachelorInstitite && <p className = "infotext">{searchProfile.bachelorInstitite}</p>}
                </div>
                <div>
                    {searchProfile.bachelorField && <p className = "infotext">{searchProfile.bachelorField}</p>}
                </div>
                <div>
                    {searchProfile.bachelorstartMonth && <p className = "infotext">{searchProfile.bachelorstartMonth}</p>}
                </div>
                <div>
                    {searchProfile.bachelorstartYear && <p className = "infotext">{searchProfile.bachelorstartYear}</p>}
                </div>
                <div>
                    {searchProfile.bachelorendMonth && <p className = "infotext">{searchProfile.bachelorendMonth}</p>}
                </div>
                <div>
                    {searchProfile.bachelorendYear && <p className = "infotext">{searchProfile.bachelorendYear}</p>}
                </div>
                <div>
                    {searchProfile.bachelorGrade && <p className = "infotext">{searchProfile.bachelorGrade}</p>}
                </div>
                <div>
                    {searchProfile.masterField && <p className = "infotext">{searchProfile.masterField}</p>}
                </div>
                <div>
                    {searchProfile.masterInstitite && <p className = "infotext">{searchProfile.masterInstitite}</p>}
                </div>
                <div>
                    {searchProfile.masterstartMonth && <p className = "infotext">{searchProfile.masterstartMonth}</p>}
                </div>
                <div>
                    {searchProfile.masterstartYear && <p className = "infotext">{searchProfile.masterstartYear}</p>}
                </div>
                <div>
                    {searchProfile.masterendMonth && <p className = "infotext">{searchProfile.masterendMonth}</p>}
                </div>
                <div>
                    {searchProfile.masterendYear && <p className = "infotext">{searchProfile.masterendYear}</p>}
                </div>
                <div>
                    {searchProfile.masterGrade && <p className = "infotext">{searchProfile.masterGrade}</p>}
                </div>
            </div>
            <div className="showdetails" >
                <h2>Achievements: </h2>
                {searchProfile.achievement && <p className = "infotext">{searchProfile.achievement}</p>}
            </div>
            <div className="showdetails" >
                <h2>Interests:</h2>
                {searchProfile.interest && <p className = "infotext">{searchProfile.interest}</p>}
            </div>
            {
                //Showing the messages to the user
            }
            <div className="message for user">{message}</div>
        </div>        
    )
}

//exporting the SearchProfiles function for use
export default SearchProfiles;