//import React, useState and useeffect from React
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
//import useNavigate from the react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/myapplication.css"

//Create the Applications function
const Applications = () => {
    //Using the Usestate to add the state variables to components
    const [applicationinfo, setApplicationinfo] = useState([]);
    const [message, setMessage] = useState("");
    const [editApplication, setEditApplication] = useState(null);
    const [editApplicationContent, seteditApplicationContent] = useState({ courseName: "", courseOverview: "", courseDetails: "", careerOpportunities: "", entryRequirements: "", tuitionFees: "", applicationPicture: "" });
    const navigate = useNavigate();
    
    useEffect(()=> {
        //getting the universitytoken from localstorage
        const universityToken = localStorage.getItem("UniversityLoginToken");
              
        //If the token doesn't exist redirect to the login page
        if(!universityToken) {
          navigate("/university/login")
        }
    }, [navigate])

    //Using the useeffect to fetch university applications
    useEffect(() => {
        retrieveApplications();
    }, []);

    //Creating the retrieveApplications function
    const retrieveApplications = async () => {
        try {
            //Getting the applications created by university by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/application/myapplications", {
                headers: { 
                    //getting the generated jwt token from login for authorisation
                    Authorization: `Bearer ${localStorage.getItem("UniversityLoginToken")}` }
            });
            //updating the applicationinfo state with application data from the server
            setApplicationinfo(res.data);
        } catch (error) {
            //If something goes wrong show this error to the university
            setMessage("Server Error. Cannot Show Your Applications");
        }
    };

    //Creating the handleEdit form function
    const handleEditForm = (id, courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements, tuitionFees, applicationPicture) => {
        //updating the editApplication state with the id
        setEditApplication(id);
        //updating the editApplicationContent state with the information from server 
        seteditApplicationContent({ courseName, courseOverview, courseDetails, careerOpportunities, entryRequirements, tuitionFees, applicationPicture}); 
    };

    //Creating a handleSubmit function
    const handleSubmit = async (e) => {
        //preventing the browser from submitting the form
        e.preventDefault();

        //setting the message to empty 
        setMessage("")

        //appending the edited data to send to the server side
        const formData = new FormData();
        formData.append("courseName", editApplicationContent.courseName);
        formData.append("courseOverview", editApplicationContent.courseOverview);
        formData.append("courseDetails", editApplicationContent.courseDetails);
        formData.append("careerOpportunities", editApplicationContent.careerOpportunities);
        formData.append("entryRequirements", editApplicationContent.entryRequirements);
        formData.append("tuitionFees", editApplicationContent.tuitionFees);
        if(editApplicationContent.applicationPicture){
            formData.append("applicationPicture", editApplicationContent.applicationPicture)
        }

        try {
            //using the put method to send the request to updated the appended data to the following link on the server side for a specific application
            const res = await axios.put(`http://localhost:4000/application/${editApplication}`, formData, {
                    headers: {
                        //using this to send the image as part of the form to the server data
                        "Content-Type": "multipart/form-data",
                        //getting the generated jwt token from login for authorisation
                        "Authorization": `Bearer ${localStorage.getItem("UniversityLoginToken")}`,
                    },
                });
            //setting the message to show the university 
            setMessage(res.data.message);
             //Use it to exit the edit mode
            setEditApplication(null); 
            //retrieve the applications again
            retrieveApplications();
        } catch (error) {
            // show the error message in case something goes wrong
            setMessage("Server Error. Cannot update Your Applications");
        }
    };

    //Creating a handledelete function
    const handledelete = async(applicationId) => {
        try {
            //using the delete method to send the request to delete the application through the following link on the server side
            const res = await axios.delete(`http://localhost:4000/application/${applicationId}`, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem('UniversityLoginToken')}` }
            });
            //updating the applicationinfo state by removing the application according to id from the array
            setApplicationinfo(applicationinfo.filter((application) => application._id !== applicationId));
            //setting the message to show the university 
            setMessage(res.data.message)
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot delete Your Applications");
        }
    }

    //Creating the display page for applications and edit form
    return (
        <div>
            <h2 className="TopTitle"> My Course List</h2>
            {
                //Creating the edit form and filling the fields with the previous data from database to update it 
                // This form is only shown once the person hits edit button
            }
            {editApplication ? (
                <div className="Application">
                    <form onSubmit={handleSubmit}>
                    <div className="courseName">
                        <label htmlFor="courseName" className="textfield">
                            Name of the Course:
                        </label>
                        <input
                            placeholder="Enter Course Name"
                            name="courseName"
                            type="text"
                            value={editApplicationContent.courseName}
                            className="inputfield"
                            onChange={(e) => seteditApplicationContent({...editApplicationContent, courseName:e.target.value})}
                            required
                        />
                    </div>
                    <div className="courseOverview">
                        <label htmlFor="courseOverview" className="textfield">
                            Course Overview:
                        </label>
                        <input
                            placeholder="Enter Course Overview"
                            name="courseOverview"
                            type="text"
                            value={editApplicationContent.courseOverview}
                            className="inputfield"
                            onChange={(e) => seteditApplicationContent({...editApplicationContent, courseOverview:e.target.value})}
                            required
                        />
                    </div>
                    <div className="courseDetails">
                        <label htmlFor="courseDetails" className="textfield">
                            Course Details:
                        </label>
                        <input
                            placeholder="Enter Course Details"
                            name="courseDetails"
                            type="text"
                            value={editApplicationContent.courseDetails}
                            className="inputfield"
                            onChange={(e) => seteditApplicationContent({...editApplicationContent, courseDetails:e.target.value})}
                            required
                        />
                    </div>
                    <div className="careerOpportunities">
                        <label htmlFor="careerOpportunities" className="textfield">
                            Career Opportunities:
                        </label>
                        <input
                            placeholder="Enter Career Opportunities"
                            name="careerOpportunities"
                            type="text"
                            value={editApplicationContent.careerOpportunities}
                            className="inputfield"
                            onChange={(e) => seteditApplicationContent({...editApplicationContent, careerOpportunities:e.target.value})}
                            required
                        />
                    </div>
                    <div className="entryRequirements">
                        <label htmlFor="entryRequirements" className="textfield">
                            Entry Requirements:
                        </label>
                        <input
                            placeholder="Enter Entry Requirements"
                            name="entryRequirements"
                            type="text"
                            value={editApplicationContent.entryRequirements}
                            className="inputfield"
                            onChange={(e) => seteditApplicationContent({...editApplicationContent, entryRequirements:e.target.value})}
                            required
                        />
                    </div>
                    <div className="tuitionFees">
                        <label htmlFor="tuitionFees" className="textfield">
                            Tuition Fees for the course:
                        </label>
                        <input
                            placeholder="Enter Tuition fees"
                            name="tuitionFees"
                            type="text"
                            value={editApplicationContent.tuitionFees}
                            className="inputfield"
                            onChange={(e) => seteditApplicationContent({...editApplicationContent, tuitionFees:e.target.value})}
                            required
                        />
                    </div>
                    <div className="applicationPicture">
                        <label htmlFor="applicationPicture" className="textfield">
                            Application Photo:
                        </label>
                        <input
                            name="applicationPicture"
                            type="file"
                            onChange={(e) => seteditApplicationContent({...editApplicationContent, applicationPicture:e.target.files[0]})}
                            accept=".png, .jpeg, .jpg"
                        />
                    </div>
                        {
                            //updating the application
                        }
                        <div className="updateButton">
                            <button className="submit">Update Application</button>
                        </div>
                    </form>
                    {
                        //cancelling the edit application request
                    }
                    <div className="cancelButton">
                        <button className = "cancel" onClick={() => setEditApplication(null)}>Cancel Edit</button>
                    </div>
                </div>
            ) : (
            <div>
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
                        {
                            //creating the edit button which will fill the previous data in the edit form once the university press the button
                        }
                        <div>
                            <button className = "submit" onClick={() => handleEditForm(applicationinfo._id, applicationinfo.courseName, applicationinfo.courseOverview, applicationinfo.courseDetails, applicationinfo.careerOpportunities, applicationinfo.entryRequirements, applicationinfo.tuitionFees, applicationinfo.applicationPicture,)}>
                                Edit
                            </button>
                        </div>
                        {
                            //Deletes the application using the id once the university clicks the button
                        }
                        <div>
                            <button className = "cancel" onClick={() => handledelete(applicationinfo._id)}>Delete Application </button>
                        </div>
                    </div>
                ))}
            </div>
            )}
            {
                //Showing the messages to the university
            }
            <div className="message for user">{message}</div>
        </div>
        
    );
};

//exporting the Applications function for use
export default Applications;
