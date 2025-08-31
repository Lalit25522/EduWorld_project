//import React, useState and useeffect from React
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
//import useNavigate from the react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/myprofile.css"

//Create the Profile function
const Profile = () => {
    //Using the Usestate to add the state variables to components
    const [profileinfo, setProfileinfo] = useState([]);
    const [message, setMessage] = useState("");
    const [editProfile, setEditProfile] = useState(null);
    const [editProfileContent, seteditProfileContent] = useState({firstName: "", lastName: "", about: "", highestEducation: "", highschoolcourses: "", course1: "", grade1: "", course2: "", grade2: "", course3: "", grade3: "", course4: "", grade4: "", course5: "", grade5: "", course6: "", grade6: "",
        course7: "", grade7: "", course8: "", grade8: "", course9: "", grade9: "", course10: "", grade10: "", bachelorField: "", bachelorInstitite: "", bachelorstartMonth: "", bachelorstartYear: "", bachelorendMonth: "", bachelorendYear: "", 
         bachelorGrade: "", masterField: "", masterInstitite: "", masterstartMonth: "", masterstartYear: "", masterendMonth: "", masterendYear: "", masterGrade: "", interest: "", profilePhoto:""});
    const navigate = useNavigate();

    useEffect(()=> {
        //getting the studentToken from localstorage
        const studentToken = localStorage.getItem("StudentLoginToken");
        //If the token doesn't exist redirect to the login page        
        if(!studentToken) {
            navigate("/student/login")
        }
    }, [navigate])

    //Using the useeffect to fetch user profile
    useEffect(() => {
        retrieveProfile();
    }, []);

    //Creating the retrieveProfile function
    const retrieveProfile = async () => {
        try {
            //Getting the profile created by user by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/studentprofile", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            //updating the profileInfo state with profile data from the server
            setProfileinfo(res.data);
        } catch (error) {
            //If something goes wrong show this error to the user
            setMessage("Server Error. Cannot Show Your Profile");
        }
    };

    //Creating the handleEdit form function
    const handleEditForm = (id, firstName, lastName, about, highestEducation, highschoolcourses, course1, grade1, course2, grade2, course3, grade3, course4, grade4, course5, grade5, course6, grade6,
        course7, grade7, course8, grade8, course9, grade9, course10, grade10, bachelorField, bachelorInstitite, bachelorstartMonth, bachelorstartYear, bachelorendMonth, bachelorendYear, 
         bachelorGrade, masterField, masterInstitite, masterstartMonth, masterstartYear, masterendMonth, masterendYear, masterGrade, achievement, interest, profilePhoto) => {
        //updating the editProfile state with the id
        setEditProfile(id);
        //updating the editProfileContent state with the information from server 
        seteditProfileContent({ firstName, lastName, about, highestEducation, highschoolcourses, course1, grade1, course2, grade2, course3, grade3, course4, grade4, course5, grade5, course6, grade6,
            course7, grade7, course8, grade8, course9, grade9, course10, grade10, bachelorField, bachelorInstitite, bachelorstartMonth, bachelorstartYear, bachelorendMonth, bachelorendYear, 
             bachelorGrade, masterField, masterInstitite, masterstartMonth, masterstartYear, masterendMonth, masterendYear, masterGrade, achievement, interest, profilePhoto}); 
    };

    //Creating a handleSubmit function
    const handleSubmit = async (e) => {
        //preventing the browser from submitting the form
        e.preventDefault();
        //setting the message to empty 
        setMessage("")

        //appending the edited data to send to the server side
        const formData = new FormData();
        if(editProfileContent.profilePhoto){
            formData.append("profilePhoto", editProfileContent.profilePhoto);
            }
            formData.append("firstName", editProfileContent.firstName);
            formData.append("lastName", editProfileContent.lastName);
            if(editProfileContent.about){
            formData.append("about", editProfileContent.about);
            }
            if(editProfileContent.highestEducation){
            formData.append("highestEducation", editProfileContent.highestEducation);
            }
            if(editProfileContent.highschoolcourses){
            formData.append("highschoolcourses", editProfileContent.highschoolcourses);
            }
            if(editProfileContent.course1){
              formData.append("course1", editProfileContent.course1);
            }
            if(editProfileContent.grade1){
              formData.append("grade1", editProfileContent.grade1);
            }
            if(editProfileContent.course2){
              formData.append("course2", editProfileContent.course2);
            }
            if(editProfileContent.grade2){
              formData.append("grade2", editProfileContent.grade2);
            }
            if(editProfileContent.course3){
              formData.append("course3", editProfileContent.course3);
            }
            if(editProfileContent.grade3){
              formData.append("grade3", editProfileContent.grade3);
            }
            if(editProfileContent.course4){
              formData.append("course4", editProfileContent.course4);
            }
            if(editProfileContent.grade4){
              formData.append("grade4", editProfileContent.grade4);
            }
            if(editProfileContent.course5){
              formData.append("course5", editProfileContent.course5);
            }
            if(editProfileContent.grade5){
              formData.append("grade5", editProfileContent.grade5);
            }
            if(editProfileContent.course6){
              formData.append("course6", editProfileContent.course6);
            }
            if(editProfileContent.grade6){
              formData.append("grade6", editProfileContent.grade6);
            }
            if(editProfileContent.course7){
              formData.append("course7", editProfileContent.course7);
            }
            if(editProfileContent.grade7){
              formData.append("grade7", editProfileContent.grade7);
            }
            if(editProfileContent.course8){
              formData.append("course8", editProfileContent.course8);
            }
            if(editProfileContent.grade8){
              formData.append("grade8", editProfileContent.grade8);
            }
            if(editProfileContent.course9){
              formData.append("course9", editProfileContent.course9);
            }
            if(editProfileContent.grade9){
              formData.append("grade9", editProfileContent.grade9);
            }
            if(editProfileContent.course10){
              formData.append("course1", editProfileContent.course10);
            }
            if(editProfileContent.grade10){
              formData.append("grade10", editProfileContent.grade10);
            }
            if(editProfileContent.bachelorField){
            formData.append("bachelorField", editProfileContent.bachelorField);
            }
            if(editProfileContent.bachelorInstitite){
              formData.append("bachelorInstitite", editProfileContent.bachelorInstitite);
            }
            if(editProfileContent.bachelorstartMonth){
              formData.append("bachelorstartMonth", editProfileContent.bachelorstartMonth);
            }
            if(editProfileContent.bachelorstartYear){
              formData.append("bachelorstartYear", editProfileContent.bachelorstartYear);
            }
            if(editProfileContent.bachelorendMonth){
              formData.append("bachelorendMonth", editProfileContent.bachelorendMonth);
            }
            if(editProfileContent.bachelorendYear){
              formData.append("bachelorendYear", editProfileContent.bachelorendYear);
            }
            if(editProfileContent.bachelorGrade){
              formData.append("bachelorGrade", editProfileContent.bachelorGrade);
            }
            if(editProfileContent.masterField){
              formData.append("masterField", editProfileContent.masterField);
            }
            if(editProfileContent.masterInstitite){
              formData.append("masterInstitite", editProfileContent.masterInstitite);
            }
            if(editProfileContent.masterstartMonth){
              formData.append("masterstartMonth", editProfileContent.masterstartMonth);
            }
            if(editProfileContent.masterstartYear){
              formData.append("masterstartYear", editProfileContent.masterstartYear);
            }
            if(editProfileContent.masterendMonth){
              formData.append("masterendMonth", editProfileContent.masterendMonth);
            }
            if(editProfileContent.masterendYear){
              formData.append("masterendYear", editProfileContent.masterendYear);
            }
            if(editProfileContent.masterGrade){
              formData.append("masterGrade", editProfileContent.masterGrade);
            }
            if(editProfileContent.achievement){
            formData.append("achievement", editProfileContent.achievement);
            }
            if(editProfileContent.interest){
            formData.append("interest", editProfileContent.interest);
            }

        try {
            //using the put method to send the request to updated the appended data to the following link on the server side for a specific profile
            const res = await axios.put(`http://localhost:4000/studentprofile/${editProfile}`,formData, {
                    headers: {
                        //getting the generated jwt token from login for authorisation
                        "Authorization": `Bearer ${localStorage.getItem("StudentLoginToken")}`,
                        //using this to send the image as part of the form to the server data
                        "Content-Type": "multipart/form-data"
                    },
                });
            //setting the message to show the user 
            setMessage(res.data.message);
            //Use it to exit the edit mode
            setEditProfile(null); 
            //retrieve the profile again
            retrieveProfile();
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot Update Your Profile");
        }
    };

    //Creating a handledelete function
    const handledelete = async(profileId) => {
        try {
            //using the delete method to send the request to delete the profile through the following link on the server side
            const res = await axios.delete(`http://localhost:4000/studentprofile/${profileId}`, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem('StudentLoginToken')}` }
            });
            //updating the profileinfo state by removing the profile according to id from the array
            setProfileinfo(profileinfo.filter((profile) => profile._id !== profileId));
            //setting the message to show the user 
            setMessage(res.data.message)
            //navigate to the create profile page
            navigate("/student/createprofile")
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot Delete Your Profile");
        }
    }

    //Creating the display page for profile and edit form
    return (
        <div className = "Profilepage">
            <h2 className="Title"> My Profile</h2>
            {
                //Creating the edit form and filling the fields with the previous data from database to update it 
                // This form is only shown once the person hits edit button
            }
            {editProfile ? (
                <div>
                    <form onSubmit={handleSubmit}>
                    <div className="ProfilePhoto">
                        <label htmlFor="ProfilePhoto" className="textfield">
                            Profile Photo:
                        </label>
                        <input
                            name="profilePhoto"
                            type="file"
                            onChange={(e) => seteditProfileContent({...editProfileContent, profilePhoto: e.target.files[0]})}
                            accept=".png, .jpeg, .jpg"
                        />
                    </div>
                    <div className="firstName">
                        <label htmlFor="firstName" className="textfield">
                        First Name:
                        </label>
                        <input
                        placeholder="Enter Your First Name"
                        name="firstName"
                        value = {editProfileContent.firstName}
                        type="text"
                        className="inputfield"
                        onChange={(e) => seteditProfileContent({...editProfileContent, firstName: e.target.value})}
                        required
                        />
                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName" className="textfield">
                        Last Name:
                        </label>
                        <input
                        placeholder="Enter Your Last Name"
                        name="lastName"
                        value = {editProfileContent.lastName}
                        type="text"
                        className="inputfield"
                        onChange={(e) => seteditProfileContent({...editProfileContent, lastName: e.target.value})}
                        required
                        />
                    </div>
                    <div className="about">
                        <label htmlFor="about" className="textfield">
                        About Yourself:
                        </label>
                        <input
                        placeholder="Enter Something about Yourself"
                        name="about"
                        type="text"
                        value = {editProfileContent.about}
                        onChange={(e) => seteditProfileContent({...editProfileContent, about: e.target.value})}
                        className="inputfield"
                        />
                    </div>
                    <div className="education">
                        <div className="highestEducation">
                        <label htmlFor="highestEducation" className="textfield">
                            Highest level of Education:
                        </label>
                        <select
                            name = "highestEducation"
                            value = {editProfileContent.highestEducation}
                            className="inputfield"
                            onChange={(e) => {seteditProfileContent({
                                        firstName: editProfileContent.firstName,
                                        lastName: editProfileContent.lastName,
                                        about: editProfileContent.about,
                                        highschoolcourses : "",
                                        course1 : "",
                                        grade1 : "",
                                        course2 : "",
                                        grade2 : "",
                                        course3 : "",
                                        grade3 : "",
                                        course4 : "",
                                        grade4 : "",
                                        course5 : "",
                                        grade5 : "",
                                        course6 : "",
                                        grade6 : "",
                                        course7 : "",
                                        grade7 : "",
                                        course8 : "",
                                        grade8 : "",
                                        course9 : "",
                                        grade9 : "",
                                        course10 : "",
                                        grade10 : "",
                                        bachelorField : "",
                                        bachelorInstitite : "",
                                        bachelorstartMonth : "",
                                        bachelorstartYear : "",
                                        bachelorendMonth : "",
                                        bachelorendYear : "",
                                        bachelorGrade : "",
                                        masterField : "",
                                        masterInstitite : "",
                                        masterstartMonth : "",
                                        masterstartYear : "",
                                        masterendMonth : "",
                                        masterendYear : "",
                                        masterGrade : "",
                                        achievement: editProfileContent.achievement,
                                        interest: editProfileContent.interest,
                                highestEducation: e.target.value}); }}
                            required >
                            <option value = ""> Select the Highest Education</option>
                            <option value = "highschool"> High School</option> 
                            <option value = "Bachelor"> Bachelor Degree</option> 
                            <option value = "Master"> Master Degree</option> 
                        </select>
                        </div>
                        {editProfileContent.highestEducation === "highschool" && (
                        <div>
                            <div className="Coursestaken">
                            <label htmlFor="courses" className = "selectfield">
                                Courses
                            </label>
                            <select
                                name = "highschoolcourses"
                                className="inputfield"
                                value = {editProfileContent.highschoolcourses}
                                onChange={(e) => seteditProfileContent({...editProfileContent, highschoolcourses: e.target.value})}
                            
                            
                            >
                                <option value = ""> Select the Type of Education after GCSE</option>
                                <option value = "alevels"> A levels</option> 
                                <option value = "IB"> IB</option> 
                                <option value = "btec"> BTEC diplomas </option> 
                                <option value = "tlevels"> T levels</option> 
                            </select>
                            </div>
                            {editProfileContent.highschoolcourses === "alevels" && (
                            <div>
                                <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course1"
                                    value = {editProfileContent.course1}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course1: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade1"
                                    className="inputfield"
                                    value = {editProfileContent.grade1}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade1: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course2"
                                    value = {editProfileContent.course2}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course2: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade2"
                                    className="inputfield"
                                    value = {editProfileContent.grade2}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade2: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course3"
                                    value = {editProfileContent.course3}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course3: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade3"
                                    className="inputfield"
                                    value = {editProfileContent.grade3}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade3: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course4"
                                    value = {editProfileContent.course4}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course4: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade4"
                                    className="inputfield"
                                    value = {editProfileContent.grade4}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade4: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course5"
                                    value = {editProfileContent.course5}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course5: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade5"
                                    className="inputfield"
                                    value = {editProfileContent.grade5}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade5: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course6"
                                    value = {editProfileContent.course6}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course6: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade6"
                                    className="inputfield"
                                    value = {editProfileContent.grade6}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade6: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course7"
                                    value = {editProfileContent.course7}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course7: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade7"
                                    className="inputfield"
                                    value = {editProfileContent.grade7}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade7: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course8"
                                    value = {editProfileContent.course8}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course8: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade8"
                                    className="inputfield"
                                    value = {editProfileContent.grade8}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade8: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course9"
                                    value = {editProfileContent.course9}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course9: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade9"
                                    className="inputfield"
                                    value = {editProfileContent.grade9}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade9: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course10"
                                    value = {editProfileContent.course10}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course10: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade10"
                                    className="inputfield"
                                    value = {editProfileContent.grade10}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade10: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Astar"> A*</option> 
                                    <option value = "A"> A </option> 
                                    <option value = "B"> B </option> 
                                    <option value = "C"> C </option> 
                                    <option value = "D"> D </option> 
                                    <option value = "E"> E </option> 
                                </select>
                            </div>
                            </div>
                            )}
                            {editProfileContent.highschoolcourses === "IB" && (
                            <div>
                                <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course1"
                                    value = {editProfileContent.course1}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course1: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade1"
                                    className="inputfield"
                                    value = {editProfileContent.grade1}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade1: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course2"
                                    value = {editProfileContent.course2}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course2: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade2"
                                    className="inputfield"
                                    value = {editProfileContent.grade2}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade2: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course3"
                                    value = {editProfileContent.course3}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course3: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade3"
                                    className="inputfield"
                                    value = {editProfileContent.grade3}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade3: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course4"
                                    value = {editProfileContent.course4}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course4: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade4"
                                    className="inputfield"
                                    value = {editProfileContent.grade4}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade4: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course5"
                                    value = {editProfileContent.course5}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course5: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade5"
                                    className="inputfield"
                                    value = {editProfileContent.grade5}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade5: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course6"
                                    value = {editProfileContent.course6}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course6: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade6"
                                    className="inputfield"
                                    value = {editProfileContent.grade6}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade6: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course7"
                                    value = {editProfileContent.course7}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course7: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade7"
                                    className="inputfield"
                                    value = {editProfileContent.grade7}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade7: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course8"
                                    value = {editProfileContent.course8}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course8: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade8"
                                    className="inputfield"
                                    value = {editProfileContent.grade8}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade8: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course9"
                                    value = {editProfileContent.course9}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course9: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade9"
                                    className="inputfield"
                                    value = {editProfileContent.grade9}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade9: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course10"
                                    value = {editProfileContent.course10}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course10: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade10"
                                    className="inputfield"
                                    value = {editProfileContent.grade10}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade10: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "1"> 1</option> 
                                    <option value = "2"> 2 </option> 
                                    <option value = "3"> 3 </option> 
                                    <option value = "4"> 4 </option> 
                                    <option value = "5"> 5 </option> 
                                    <option value = "6"> 6 </option> 
                                    <option value = "7"> 7 </option> 
                                </select>
                            </div>
                            </div>
                            )}
                            {editProfileContent.highschoolcourses === "btec" && (
                            <div>
                                <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course1"
                                    value = {editProfileContent.course1}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course1: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade1"
                                    className="inputfield"
                                    value = {editProfileContent.grade1}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade1: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course2"
                                    value = {editProfileContent.course2}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course2: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade2"
                                    className="inputfield"
                                    value = {editProfileContent.grade2}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade2: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course3"
                                    value = {editProfileContent.course3}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course3: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade3"
                                    className="inputfield"
                                    value = {editProfileContent.grade3}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade3: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course4"
                                    value = {editProfileContent.course4}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course4: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade4"
                                    className="inputfield"
                                    value = {editProfileContent.grade4}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade4: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course5"
                                    value = {editProfileContent.course5}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course5: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade5"
                                    className="inputfield"
                                    value = {editProfileContent.grade5}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade5: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course6"
                                    value = {editProfileContent.course6}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course6: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade6"
                                    className="inputfield"
                                    value = {editProfileContent.grade6}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade6: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course7"
                                    value = {editProfileContent.course7}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course7: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade7"
                                    className="inputfield"
                                    value = {editProfileContent.grade7}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade7: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course8"
                                    value = {editProfileContent.course8}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course8: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade8"
                                    className="inputfield"
                                    value = {editProfileContent.grade8}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade8: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course9"
                                    value = {editProfileContent.course9}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course9: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade9"
                                    className="inputfield"
                                    value = {editProfileContent.grade9}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade9: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course10"
                                    value = {editProfileContent.course10}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course10: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade10"
                                    className="inputfield"
                                    value = {editProfileContent.grade10}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade10: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "Starred"> Starred Distinction (D)* </option> 
                                    <option value = "Distinction"> Distinction (D) </option> 
                                    <option value = "Merit"> Merit (M) </option> 
                                    <option value = "Pass"> Pass (P) </option>
                                </select>
                            </div>
                            </div>
                            )}
                            {editProfileContent.highschoolcourses === "tlevels" && (
                            <div>
                                <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course1"
                                    value = {editProfileContent.course1}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course1: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade1"
                                    className="inputfield"
                                    value = {editProfileContent.grade1}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade1: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course2"
                                    value = {editProfileContent.course2}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course2: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade2"
                                    className="inputfield"
                                    value = {editProfileContent.grade2}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade2: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course3"
                                    value = {editProfileContent.course3}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course3: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade3"
                                    className="inputfield"
                                    value = {editProfileContent.grade3}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade3: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course4"
                                    value = {editProfileContent.course4}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course4: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade4"
                                    className="inputfield"
                                    value = {editProfileContent.grade4}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade4: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course5"
                                    value = {editProfileContent.course5}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course5: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade5"
                                    className="inputfield"
                                    value = {editProfileContent.grade5}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade5: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course6"
                                    value = {editProfileContent.course6}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course6: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade6"
                                    className="inputfield"
                                    value = {editProfileContent.grade6}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade6: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course7"
                                    value = {editProfileContent.course7}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course7: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade7"
                                    className="inputfield"
                                    value = {editProfileContent.grade7}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade7: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course8"
                                    value = {editProfileContent.course8}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course8: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade8"
                                    className="inputfield"
                                    value = {editProfileContent.grade8}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade8: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course9"
                                    value = {editProfileContent.course9}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course9: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade9"
                                    className="inputfield"
                                    value = {editProfileContent.grade9}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade9: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            <div className="course">
                                <label htmlFor="course" className="textfield">
                                    Course Name:
                                </label>
                                <input
                                    placeholder="Enter Course Name "
                                    name="course10"
                                    value = {editProfileContent.course10}
                                    type="text"
                                    className="inputfield"
                                    onChange={(e) => seteditProfileContent({...editProfileContent, course10: e.target.value})}
                                />
                                <label htmlFor="grade" className="textfield">
                                    Grade for the course:
                                </label>
                                <select
                                    name = "grade10"
                                    className="inputfield"
                                    value = {editProfileContent.grade10}
                                    onChange={(e) => seteditProfileContent({...editProfileContent, grade10: e.target.value})}
                                >
                                    <option value = ""> Select the Grade</option>
                                    <option value = "StarDistinction"> Distinction* </option> 
                                    <option value = "Distinction"> Distinction </option> 
                                    <option value = "Merit"> Merit </option> 
                                    <option value = "Pass"> Pass </option> 
                                </select>
                            </div>
                            </div>
                            )}          
                        </div>
                        )}
                        {editProfileContent.highestEducation === "Bachelor" && (
                        <div>
                            <div className="field">
                            <label htmlFor="field" className="textfield">
                                Field of Study:
                            </label>
                            <input
                                placeholder="Enter Your field of study"
                                name="bachelorField"
                                value= {editProfileContent.bachelorField}
                                type="text"
                                className="inputfield"
                                onChange={(e) => seteditProfileContent({...editProfileContent, bachelorField: e.target.value})}
                            />
                            </div>
                            <div className="institute">
                            <label htmlFor="institute" className="textfield">
                                Educational Institute name:
                            </label>
                            <input
                                placeholder="Enter Your Educational Institute name"
                                name="bachelorInstitite"
                                value= {editProfileContent.bachelorInstitite}
                                type="text"
                                className="inputfield"
                                onChange={(e) => seteditProfileContent({...editProfileContent, bachelorInstitite: e.target.value})}
                            />
                            </div>
                            <div className="startDate">
                            <label htmlFor="startDate" className="textfield">
                                Start Date:
                            </label>
                            <select 
                                name = "bachelorstartMonth"
                                className="inputfield"
                                value = {editProfileContent.bachelorstartMonth}
                                onChange={(e) => seteditProfileContent({...editProfileContent, bachelorstartMonth: e.target.value})}
                            >
                                <option value = "">Select the Start Month</option>
                                <option value = "January">January</option>
                                <option value = "February">February</option>
                                <option value = "March">March</option>
                                <option value = "April">April</option>
                                <option value = "May">May</option>
                                <option value = "June">June</option>
                                <option value = "July">July</option>
                                <option value = "August">August</option>
                                <option value = "September">September</option>
                                <option value = "October">October</option>
                                <option value = "November">November</option>
                                <option value = "December">December</option>
                            </select>

                            <select
                                name = "bachelorstartYear"
                                className="inputfield"
                                value = {editProfileContent.bachelorstartYear}
                                onChange={(e) => seteditProfileContent({...editProfileContent, bachelorstartYear: e.target.value})}
                            >
                                <option value = "">Select the Start Year</option>
                                <option value = "2015">2015</option>
                                <option value = "2016">2016</option>
                                <option value = "2017">2017</option>
                                <option value = "2018">2018</option>
                                <option value = "2019">2019</option>
                                <option value = "2020">2020</option>
                                <option value = "2021">2021</option>
                                <option value = "2022">2022</option>
                                <option value = "2023">2023</option>
                                <option value = "2024">2024</option>
                                <option value = "2025">2025</option>
                                <option value = "2026">2026</option>
                                <option value = "2027">2027</option>
                                <option value = "2028">2028</option>
                                <option value = "2029">2029</option>
                                <option value = "2030">2030</option>
                                <option value = "2031">2031</option>
                            </select>
                            </div>
                            <div className="endDate">
                            <label htmlFor="endDate" className="textfield">
                                End Date/ Expected End Date:
                            </label>
                            <select 
                                name = "bachelorendMonth"
                                className="inputfield"
                                value = {editProfileContent.bachelorendMonth}
                                onChange={(e) => seteditProfileContent({...editProfileContent, bachelorendMonth: e.target.value})}
                            >
                                <option value = "">Select the End Month</option>
                                <option value = "January">January</option>
                                <option value = "February">February</option>
                                <option value = "March">March</option>
                                <option value = "April">April</option>
                                <option value = "May">May</option>
                                <option value = "June">June</option>
                                <option value = "July">July</option>
                                <option value = "August">August</option>
                                <option value = "September">September</option>
                                <option value = "October">October</option>
                                <option value = "November">November</option>
                                <option value = "December">December</option>
                            </select>
                            <select
                                name = "bachelorendYear"
                                className="inputfield"
                                value = {editProfileContent.bachelorendYear}
                                onChange={(e) => seteditProfileContent({...editProfileContent, bachelorendYear: e.target.value})}
                            >
                                <option value = "">Select the End Year</option>
                                <option value = "2015">2015</option>
                                <option value = "2016">2016</option>
                                <option value = "2017">2017</option>
                                <option value = "2018">2018</option>
                                <option value = "2019">2019</option>
                                <option value = "2020">2020</option>
                                <option value = "2021">2021</option>
                                <option value = "2022">2022</option>
                                <option value = "2023">2023</option>
                                <option value = "2024">2024</option>
                                <option value = "2025">2025</option>
                                <option value = "2026">2026</option>
                                <option value = "2027">2027</option>
                                <option value = "2028">2028</option>
                                <option value = "2029">2029</option>
                                <option value = "2030">2030</option>
                                <option value = "2031">2031</option>
                            </select>
                            </div>
                            <div>
                            <label htmlFor="Bachelorgrade" className="textfield">
                                Bachelor Degree Grade:
                            </label>
                            <select
                                name = "bachelorGrade"
                                className="inputfield"
                                value = {editProfileContent.bachelorGrade}
                                onChange={(e) => seteditProfileContent({...editProfileContent, bachelorGrade: e.target.value})}
                            >
                                <option value = ""> Select the Grade</option>
                                <option value = "firstGrade"> First-Class Honours </option> 
                                <option value = "upperSecond"> Upper Second-Class Honours</option> 
                                <option value = "lowerSecond"> Lower Second-Class Honours</option> 
                                <option value = "thirdGrade"> Third-Class Honours</option> 
                                <option value = "ordinaryDegree"> Ordinary degree</option> 
                                <option value = "fail">Fail</option>
                            </select>
                            </div>
                        </div>
                        )}
                        {editProfileContent.highestEducation === "Master" && (
                        <div>
                            <div className="field">
                            <label htmlFor="field" className="textfield">
                                Field of Study:
                            </label>
                            <input
                                placeholder="Enter Your field of study"
                                value ={editProfileContent.masterField}
                                name="masterField"
                                type="text"
                                className="inputfield"
                                onChange={(e) => seteditProfileContent({...editProfileContent, masterField: e.target.value})}
                            />
                            </div>
                            <div className="institute">
                            <label htmlFor="institute" className="textfield">
                                Educational Institute name:
                            </label>
                            <input
                                placeholder="Enter Your Educational Institute name"
                                value={editProfileContent.masterInstitite}
                                name="masterInstitite"
                                type="text"
                                className="inputfield"
                                onChange={(e) => seteditProfileContent({...editProfileContent, masterInstitite: e.target.value})}
                            />
                            </div>
                            <div className="startDate">
                            <label htmlFor="startDate" className="textfield">
                                Start Date:
                            </label>
                            <select 
                                name = "masterstartMonth"
                                className="inputfield"
                                value = {editProfileContent.masterstartMonth}
                                onChange={(e) => seteditProfileContent({...editProfileContent, masterstartMonth: e.target.value})}
                            >
                                <option value = "">Select the Start Month</option>
                                <option value = "January">January</option>
                                <option value = "February">February</option>
                                <option value = "March">March</option>
                                <option value = "April">April</option>
                                <option value = "May">May</option>
                                <option value = "June">June</option>
                                <option value = "July">July</option>
                                <option value = "August">August</option>
                                <option value = "September">September</option>
                                <option value = "October">October</option>
                                <option value = "November">November</option>
                                <option value = "December">December</option>
                            </select>
                            <select
                                name = "masterstartYear"
                                className="inputfield"
                                value = {editProfileContent.masterstartYear}
                                onChange={(e) => seteditProfileContent({...editProfileContent, masterstartYear: e.target.value})}
                            >
                                <option value = "">Select the Start Year</option>
                                <option value = "2015">2015</option>
                                <option value = "2016">2016</option>
                                <option value = "2017">2017</option>
                                <option value = "2018">2018</option>
                                <option value = "2019">2019</option>
                                <option value = "2020">2020</option>
                                <option value = "2021">2021</option>
                                <option value = "2022">2022</option>
                                <option value = "2023">2023</option>
                                <option value = "2024">2024</option>
                                <option value = "2025">2025</option>
                                <option value = "2026">2026</option>
                                <option value = "2027">2027</option>
                                <option value = "2028">2028</option>
                                <option value = "2029">2029</option>
                                <option value = "2030">2030</option>
                                <option value = "2031">2031</option>
                            </select>
                            </div>
                            <div className="endDate">
                            <label htmlFor="endDate" className="textfield">
                                End Date/ Expected End Date:
                            </label>
                            <select 
                                name = "masterendMonth"
                                className="inputfield"
                                value = {editProfileContent.masterendMonth}
                                onChange={(e) => seteditProfileContent({...editProfileContent, masterendMonth: e.target.value})}
                            >
                                <option value = "">Select the End Month</option>
                                <option value = "January">January</option>
                                <option value = "February">February</option>
                                <option value = "March">March</option>
                                <option value = "April">April</option>
                                <option value = "May">May</option>
                                <option value = "June">June</option>
                                <option value = "July">July</option>
                                <option value = "August">August</option>
                                <option value = "September">September</option>
                                <option value = "October">October</option>
                                <option value = "November">November</option>
                                <option value = "December">December</option>
                            </select>
                            <select
                                name = "masterendYear"
                                className="inputfield"
                                value = {editProfileContent.masterendYear}
                                onChange={(e) => seteditProfileContent({...editProfileContent, masterendYear: e.target.value})}
                            >
                                <option value = "">Select the End Year</option>
                                <option value = "2015">2015</option>
                                <option value = "2016">2016</option>
                                <option value = "2017">2017</option>
                                <option value = "2018">2018</option>
                                <option value = "2019">2019</option>
                                <option value = "2020">2020</option>
                                <option value = "2021">2021</option>
                                <option value = "2022">2022</option>
                                <option value = "2023">2023</option>
                                <option value = "2024">2024</option>
                                <option value = "2025">2025</option>
                                <option value = "2026">2026</option>
                                <option value = "2027">2027</option>
                                <option value = "2028">2028</option>
                                <option value = "2029">2029</option>
                                <option value = "2030">2030</option>
                                <option value = "2031">2031</option>
                            </select>
                            </div>
                            <div>
                            <label htmlFor="masterGrade" className="textfield">
                                MASTER Degree Grade:
                            </label>
                            <select
                                name = "masterGrade"
                                className="inputfield"
                                value={editProfileContent.masterGrade}
                                onChange={(e) => seteditProfileContent({...editProfileContent, masterGrade: e.target.value})}
                            >
                                <option value = ""> Select the Grade</option>
                                <option value = "Distinction"> Distinction </option> 
                                <option value = "Merit"> Merit</option> 
                                <option value = "Pass"> Pass</option> 
                                <option value = "passfail"> Borderline pass/fail</option> 
                            </select>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="achievement">
                        <label htmlFor="achievement" className="textfield">
                        Achievements:
                        </label>
                        <input
                        placeholder="Enter Your Achievements"
                        name="achievement"
                        value={editProfileContent.achievement}
                        type="text"
                        className="inputfield"
                        onChange={(e) => seteditProfileContent({...editProfileContent, achievement: e.target.value})}
                        />
                    </div>
                    <div className="interest">
                        <label htmlFor="interest" className="textfield">
                            Interests:
                        </label>
                        <input
                            placeholder="Enter Your Interests"
                            name="interest"
                            value={editProfileContent.interest}
                            type="text"
                            className="inputfield"
                            onChange={(e) => seteditProfileContent({...editProfileContent, interest: e.target.value})}
                        />
                    </div>
                        {
                            //updating the profile
                        }
                        <div className="updateButton">
                            <button className="submit">Update Profile</button>
                        </div>
                    </form>
                    {
                        //cancelling the edit profile request
                    }
                    <div className="cancelButton">
                        <button className = "cancel" onClick={() => setEditProfile(null)}>Cancel Edit</button>
                    </div>
                </div>
            ) : (
            <div>
                {profileinfo.map((profileinfo) => (
                    <div key={profileinfo._id}>
                        {
                            //showing the profile data from the database
                        }
                        <div className = "profile">
                            {<img className = "profilephoto" src={profileinfo.profilePhoto} alt="profilePhoto"/>}
                        </div>
                        <div className= "name">
                            <h1 className= "fullname">{profileinfo.firstName} {profileinfo.lastName}</h1>
                        </div>
                        {
                            //only showing the field if it not empty
                        }
                        <div className= "showdetails">
                            <h2>About:</h2>
                            {profileinfo.about && <p className = "infotext">{profileinfo.about}</p>}
                        </div>
                        <div className="showdetails">
                            <h2>Highest Education</h2>
                            {profileinfo.highestEducation && <p className = "infotext">{profileinfo.highestEducation}</p>}
                        </div>
                        <div className="showdetails" >
                            <h2>Education Details</h2>
                            <div>
                                {profileinfo.highschoolcourses && <p>{profileinfo.highschoolcourses}</p>}
                            </div>
                            <div>
                                {profileinfo.course1 && <p className = "infotext">{profileinfo.course1}</p>}
                            </div>
                            <div>
                                {profileinfo.grade1 && <p className = "infotext">{profileinfo.grade1}</p>}
                            </div>
                            <div>
                                {profileinfo.course2 && <p className = "infotext">{profileinfo.course2}</p>}
                            </div>
                            <div>
                                {profileinfo.grade2 && <p className = "infotext">{profileinfo.grade2}</p>}
                            </div>
                            <div>
                                {profileinfo.course3 && <p className = "infotext">{profileinfo.course3}</p>}
                            </div>
                            <div>
                                {profileinfo.grade3 && <p className = "infotext">{profileinfo.grade3}</p>}
                            </div>
                            <div>
                                {profileinfo.course4 && <p className = "infotext">{profileinfo.course4}</p>}
                            </div>
                            <div>
                                {profileinfo.grade4 && <p className = "infotext">{profileinfo.grade4}</p>}
                            </div>
                            <div>
                                {profileinfo.course5 && <p className = "infotext">{profileinfo.course5}</p>}
                            </div>
                            <div>
                                {profileinfo.grade5 && <p className = "infotext">{profileinfo.grade5}</p>}
                            </div>
                            <div>
                                {profileinfo.course6 && <p className = "infotext">{profileinfo.course6}</p>}
                            </div>
                            <div>
                                {profileinfo.grade6 && <p className = "infotext">{profileinfo.grade6}</p>}
                            </div>
                            <div>
                                {profileinfo.course7 && <p className = "infotext">{profileinfo.course7}</p>}
                            </div>
                            <div>
                                {profileinfo.grade7 && <p className = "infotext">{profileinfo.grade7}</p>}
                            </div>
                            <div>
                                {profileinfo.course8 && <p className = "infotext">{profileinfo.course8}</p>}
                            </div>
                            <div>
                                {profileinfo.grade8 && <p className = "infotext">{profileinfo.grade8}</p>}
                            </div>
                            <div>
                                {profileinfo.course9 && <p className = "infotext">{profileinfo.course9}</p>}
                            </div>
                            <div>
                                {profileinfo.grade9 && <p className = "infotext">{profileinfo.grade9}</p>}
                            </div>
                            <div>
                                {profileinfo.course10 && <p className = "infotext">{profileinfo.course10}</p>}
                            </div>
                            <div>
                                {profileinfo.grade10 && <p className = "infotext">{profileinfo.grade10}</p>}
                            </div>
                            <div>
                                {profileinfo.bachelorInstitite && <p className = "infotext">{profileinfo.bachelorInstitite}</p>}
                            </div>
                            <div>
                                {profileinfo.bachelorField && <p className = "infotext">{profileinfo.bachelorField}</p>}
                            </div>
                            <div>
                                {profileinfo.bachelorstartMonth && <p className = "infotext">{profileinfo.bachelorstartMonth}</p>}
                            </div>
                            <div>
                                {profileinfo.bachelorstartYear && <p className = "infotext">{profileinfo.bachelorstartYear}</p>}
                            </div>
                            <div>
                                {profileinfo.bachelorendMonth && <p className = "infotext">{profileinfo.bachelorendMonth}</p>}
                            </div>
                            <div>
                                {profileinfo.bachelorendYear && <p className = "infotext">{profileinfo.bachelorendYear}</p>}
                            </div>
                            <div>
                                {profileinfo.bachelorGrade && <p className = "infotext">{profileinfo.bachelorGrade}</p>}
                            </div>
                            <div>
                                {profileinfo.masterField && <p className = "infotext">{profileinfo.masterField}</p>}
                            </div>
                            <div>
                                {profileinfo.masterInstitite && <p className = "infotext">{profileinfo.masterInstitite}</p>}
                            </div>
                            <div>
                                {profileinfo.masterstartMonth && <p className = "infotext">{profileinfo.masterstartMonth}</p>}
                            </div>
                            <div>
                                {profileinfo.masterstartYear && <p className = "infotext">{profileinfo.masterstartYear}</p>}
                            </div>
                            <div>
                                {profileinfo.masterendMonth && <p className = "infotext">{profileinfo.masterendMonth}</p>}
                            </div>
                            <div>
                                {profileinfo.masterendYear && <p className = "infotext">{profileinfo.masterendYear}</p>}
                            </div>
                            <div>
                                {profileinfo.masterGrade && <p className = "infotext">{profileinfo.masterGrade}</p>}
                            </div>
                        </div>
                        <div className="showdetails" >
                            <h2>Achievements: </h2>
                            {profileinfo.achievement && <p className = "infotext">{profileinfo.achievement}</p>}
                        </div>
                        <div className="showdetails" >
                            <h2>Interests:</h2>
                            {profileinfo.interest && <p className = "infotext">{profileinfo.interest}</p>}
                        </div>
                        {
                            //creating the edit button which will fill the previous data in the edit form once the user press the button
                        }
                        <div>
                            <button className = "submit" onClick={() => handleEditForm(profileinfo._id, profileinfo.firstName, profileinfo.lastName, profileinfo.about, profileinfo.highestEducation, profileinfo.highschoolcourses, profileinfo.course1, profileinfo.grade1, 
                                                                profileinfo.course2, profileinfo.grade2, profileinfo.course3, profileinfo.grade3, profileinfo.course4, profileinfo.grade4, profileinfo.course5, profileinfo.grade5, profileinfo.course6, profileinfo.grade6,
                                                                profileinfo.course7, profileinfo.grade7, profileinfo.course8, profileinfo.grade8, profileinfo.course9, profileinfo.grade9, profileinfo.course10, profileinfo.grade10, profileinfo.bachelorField, profileinfo.bachelorInstitite, profileinfo.bachelorstartMonth, profileinfo.bachelorstartYear, profileinfo.bachelorendMonth, profileinfo.bachelorendYear, 
                                                                profileinfo.bachelorGrade, profileinfo.masterField, profileinfo.masterInstitite, profileinfo.masterstartMonth, profileinfo.masterstartYear, profileinfo.masterendMonth, profileinfo.masterendYear, profileinfo.masterGrade, profileinfo.achievement, profileinfo.interest, profileinfo.profilePhoto)}>
                                Edit
                            </button>
                        </div>
                        {
                            //Deletes the profile using the id once the user clicks the button
                        }
                        <div>
                            <button className = "cancel" onClick={() => handledelete(profileinfo._id)}>Delete Profile </button>
                        </div>
                    </div>
                ))}
            </div>
            )}
            {
                //Showing the messages to the users
            }
            <div className="message for user">{message}</div>
        </div>
        
    );
};

//exporting the Profile function for use
export default Profile;
