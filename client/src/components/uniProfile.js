//import React, useState and useeffect library
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
//import link and useNavigate from the react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/uniprofile.css"

//Create the UniProfile function
const UniProfile = () => {
    //Using the Usestate to add the state variables to components
    const [uniProfileinfo, setuniProfileinfo] = useState([]);
    const [message, setMessage] = useState("");
    const [edituniProfile, setedituniProfile] = useState(null);
    const [edituniProfileContent, setedituniProfileContent] = useState({ universityName: "", universityLocation: "", universityWebsite: "", universityEmail: "", universityDescription: "", universityProfilePhoto: "" });
    const navigate = useNavigate();
    
    useEffect(()=> {
        //getting the universitytoken from localstorage
        const universityToken = localStorage.getItem("UniversityLoginToken");
                    
        //If the token doesn't exist redirect to the login page
        if(!universityToken) {
          navigate("/university/login")
        }
    }, [navigate])

    //Using the useeffect to fetch the university profile in side effects in the component
    useEffect(() => {
        retrieveUniProfile();
    }, []);

    //Creating the retrieveUniProfile function
    const retrieveUniProfile = async () => {
        try {
            //Getting the profile created by university by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/universityprofile", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("UniversityLoginToken")}` }
            });
            //updating the uniProfileinfo state with uniProfile data from the server
            setuniProfileinfo(res.data);
        } catch (error) {
            //If something goes wrong show this error to the university
            setMessage("Server Error. Cannot Show University Profile");
        }
    };

    //Creating the handleEdit form function
    const handleEditForm = (id, universityName, universityLocation, universityWebsite, universityEmail, universityDescription, universityProfilePhoto) => {
        //updating the edituniProfile state with the id
        setedituniProfile(id);
        //updating the edituniProfileContent state with the information from server 
        setedituniProfileContent({ universityName, universityLocation, universityWebsite, universityEmail, universityDescription, universityProfilePhoto}); 
    };

    //Creating a handleSubmit function
    const handleSubmit = async (e) => {
        //preventing the browser from submitting the form
        e.preventDefault();

        //appending the edited data to send to the server side
        const formData = new FormData();
        if(edituniProfileContent.universityProfilePhoto){
            formData.append("universityProfilePhoto", edituniProfileContent.universityProfilePhoto);
        }
        formData.append("universityName", edituniProfileContent.universityName);
        formData.append("universityLocation", edituniProfileContent.universityLocation);
        formData.append("universityWebsite", edituniProfileContent.universityWebsite);
        formData.append("universityEmail", edituniProfileContent.universityEmail);
        formData.append("universityDescription", edituniProfileContent.universityDescription);

        try {
            //using the put method to send the request to updated the appended data to the following link on the server side for a specific uni profile
            const res = await axios.put(`http://localhost:4000/universityprofile/${edituniProfile}`,formData, {
                    headers: {
                        //using this to send the image as part of the form to the server data
                        "Authorization": `Bearer ${localStorage.getItem("UniversityLoginToken")}`,
                        //getting the generated jwt token from login for authorisation
                        "Content-Type": "multipart/form-data"
                    },
                });
            //setting the message to show the university
            setMessage(res.data.message);
            //Use it to exit the edit mode
            setedituniProfile(null); 
            //retrieve the profile again
            retrieveUniProfile();
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server error. Cannot update your Profile");
        }
    };

    //Creating a handledelete function
    const handledelete = async(universityprofileId) => {
        try {
            //using the delete method to send the request to delete the profile through the following link on the server side
            const res = await axios.delete(`http://localhost:4000/universityprofile/${universityprofileId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('UniversityLoginToken')}` }
            });
            //updating the uniProfileinfo state by removing the university profile according to id from the array
            setuniProfileinfo(uniProfileinfo.filter((uniprofile) => uniprofile._id !== universityprofileId));
            //setting the message to show the university 
            setMessage(res.data.message)
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot delete your profile");
        }
    }

    //Creating the display page for profile and edit form
    return (
        <div className= "uniprofile">
            <h2 className="Title"> My University Profile</h2>
            {
                //Creating the edit form and filling the fields with the previous data from database to update it 
                // This form is only shown once the person hits edit button
            }
            {edituniProfile ? (
                <div>
                    <form onSubmit={handleSubmit}>
                    <div className="universityProfilePhoto">
                        <label htmlFor="universityProfilePhoto" className="textfield">
                            University Profile Photo:
                        </label>
                        <input
                            name="universityProfilePhoto"
                            type="file"
                            onChange={(e) => setedituniProfileContent({ ...edituniProfileContent, universityProfilePhoto: e.target.files[0] })}
                            accept=".png, .jpeg, .jpg"
                        />
                    </div>
                    <div className="universityNamefield">
                        <label htmlFor="universityName" className="textfield">
                            University Name:
                        </label>
                        <input
                            placeholder="Enter University Name"
                            type="text"
                            name="universityName"
                            value = {edituniProfileContent.universityName}
                            className="inputfield"
                            onChange={(e) => setedituniProfileContent({...edituniProfileContent, universityName:e.target.value})}
                            required
                        />
                    </div>
                    <div className="universityLocationfield">
                        <label htmlFor="universityLocation" className="textfield">
                            University Location:
                        </label>
                        <input
                            placeholder="Enter University Location"
                            type="text"
                            name="universityLocation"
                            value = {edituniProfileContent.universityLocation}
                            className="inputfield"
                            onChange={(e) => setedituniProfileContent({...edituniProfileContent, universityLocation:e.target.value})}
                            required
                        />
                    </div>
                    <div className="universityWebsitefield">
                        <label htmlFor="universityWebsite" className="textfield">
                            University Website:
                        </label>
                        <input
                            placeholder="Enter University Website"
                            type="text"
                            name="universityWebsite"
                            value = {edituniProfileContent.universityWebsite}
                            className="inputfield"
                            onChange={(e) => setedituniProfileContent({...edituniProfileContent, universityWebsite:e.target.value})}
                            required
                        />
                    </div>
                    <div className="universityEmailfield">
                        <label htmlFor="universityEmail" className="textfield">
                            University Email:
                        </label>
                        <input
                            placeholder="Enter University Email"
                            type="email"
                            name="universityEmail"
                            value = {edituniProfileContent.universityEmail}
                            className="inputfield"
                            onChange={(e) => setedituniProfileContent({...edituniProfileContent, universityEmail:e.target.value})}
                            required
                        />
                    </div>
                    <div className="universityDescriptionfield">
                        <label htmlFor="universityDescription" className="textfield">
                            University Description:
                        </label>
                        <input
                            placeholder="Enter University Description"
                            type="text"
                            name="universityDescription"
                            value = {edituniProfileContent.universityDescription}
                            className="inputfield"
                            onChange={(e) => setedituniProfileContent({...edituniProfileContent, universityDescription:e.target.value})}
                            required
                        />
                    </div>
                        {
                            //updating the university Profile
                        }
                        <div className="updateButton">
                            <button className="submit">Update University Profile</button>
                        </div>
                    </form>
                    {
                        //cancelling the edit university profile request
                    }
                    <div className="cancelButton">
                        <button className = "cancel" onClick={() => setedituniProfile(null)}>Cancel Edit</button>
                    </div>
                </div>
            ) : (
            <div>
                {uniProfileinfo.map((uniProfileinfo) => (
                    <div key={uniProfileinfo._id}>
                        {
                            //showing the university profile data from the database
                        }
                        <div className="universityPhoto">
                            {<img className = "profilephoto" src={uniProfileinfo.universityProfilePhoto} alt="universityProfilePhoto"/>}
                        </div>
                        <div className="showdetails" >
                            <h2>University Name</h2>
                            <p className = "infotext">{uniProfileinfo.universityName}</p>
                        </div>
                        <div className="showdetails" >
                            <h2>University Location</h2>
                            <p className = "infotext">{uniProfileinfo.universityLocation}</p>
                        </div>
                        <div className="showdetails" >
                            <h2>University Email</h2>
                            <p className = "infotext">{uniProfileinfo.universityEmail}</p>
                        </div>
                        <div className="showdetails" >
                            <h2>University Website</h2>
                            <p className = "infotext">{uniProfileinfo.universityWebsite}</p>
                        </div>
                        <div className="showdetails" >
                            <h2>University Description</h2>
                            <p className = "infotext">{uniProfileinfo.universityDescription}</p>
                        </div>
                        {
                            //creating the edit button which will fill the previous data in the edit form once the university press the button
                        }
                        <div>
                            <button className = "submit" onClick={() => handleEditForm(uniProfileinfo._id, uniProfileinfo.universityName, uniProfileinfo.universityLocation, uniProfileinfo.universityWebsite, uniProfileinfo.universityEmail, uniProfileinfo.universityDescription, uniProfileinfo.universityProfilePhoto)}>
                                Edit
                            </button>
                        </div>
                        {
                            //Deletes the university profile using the id once the university clicks the button
                        }
                        <div>
                            <button className = "cancel" onClick={() => handledelete(uniProfileinfo._id)}>Delete University Profile </button>
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

//exporting the UniProfile function for use
export default UniProfile;
