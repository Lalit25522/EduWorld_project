//import React, useState and useeffect from react
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
// import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/myapplication.css"

//Create the Allapplications function
const Allapplications = () => {
    //Using the Usestate to add the state variables to components
    const [applicationinfo, setApplicationinfo] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        //getting the universitytoken from localstorage
        const universityToken = localStorage.getItem("UniversityLoginToken");
        const studentToken = localStorage.getItem("StudentLoginToken")
              
        //If the token doesn't exist redirect to the login page
        if(!universityToken && !studentToken) {
          navigate("/university/login")
        }
    }, [navigate])

    //Using the useeffect to fetch the applications 
    useEffect(() => {
        retrieveApplications();
        retrieveApplicationsuser();
    }, []);

    //Creating the retrieveApplications function
    const retrieveApplications = async () => {
        try {
            //Getting all the applications created by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/application", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("UniversityLoginToken")}` }
            });
            //updating the applicationinfo state with application data from the server
            setApplicationinfo(res.data);
            setMessage("");
        } catch (error) {
            //If something goes wrong show this error to the university
            setMessage("Server Error. Cannot Show All Apllications");
        }
    };

    //Creating the retrieveApplications function
    const retrieveApplicationsuser = async () => {
        try {

            //Getting all the applications created by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/application", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            //updating the applicationinfo state with application data from the server
            setApplicationinfo(res.data);
            setMessage("");
        } catch (error) {
            //If something goes wrong show this error to the university
            setMessage("Server Error. Cannot Show All Apllications");
        }
    };

    //Creating the display page for applications
    return (
            <div>
                <h1 className="ApplicationTitle">All Course List</h1>
                {applicationinfo.map((applicationinfo) => (
                    <div className= "Application" key={applicationinfo._id}>
                        {
                            //showing the application data from the database
                        }
                        <div>
                            {<img className="Image" src={applicationinfo.applicationPicture} alt="applicationPicture"/>}
                        </div>
                        <div>
                            <h2 className="coursenamecontainer">{applicationinfo.courseName}</h2>
                        </div>
                        <div>
                            <p className="details">{applicationinfo.courseOverview}</p>
                        </div>
                        <div>
                            <p className="details">{applicationinfo.courseDetails}</p>
                        </div>
                        <div>
                            <p className="details">{applicationinfo.careerOpportunities}</p>
                        </div>
                        <div>
                            <p className="details">{applicationinfo.entryRequirements}</p>
                        </div>
                        <div>
                            <p className="details">{applicationinfo.tuitionFees}</p>
                        </div>
                    </div>
                ))}
                {
                    //Showing the messages to the university
                }
                <div className="message for user">{message}</div>
            </div>
    )

};

//exporting the Allapplications function for use
export default Allapplications;