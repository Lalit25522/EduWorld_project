//import React, useState, useEffect from react
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import useNavigate from the react-router-dom
import {useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/createprofile.css"

//creating StudentProfile function
const StudentProfile = () => {
  //Using the Usestate to add the state variables to components
  const[profilePhoto, setprofilePhoto] = useState(null);
  const[firstName, setfirstName] = useState("");
  const[lastName, setlastName] = useState("");
  const[about, setAbout] = useState("");
  const[highestEducation, sethighestEducation] = useState("");
  const[highschool, sethighschool] = useState({
    highschoolcourses : '',
    course1 : '',
    grade1 : '',
    course2 : '',
    grade2 : '',
    course3 : '',
    grade3 : '',
    course4 : '',
    grade4 : '',
    course5 : '',
    grade5 : '',
    course6 : '',
    grade6 : '',
    course7 : '',
    grade7 : '',
    course8 : '',
    grade8 : '',
    course9 : '',
    grade9 : '',
    course10 : '',
    grade10 : '',
  });
  const[bachelor, setBachelor] = useState({
    bachelorField : '',
    bachelorInstitite : '',
    bachelorstartMonth : '',
    bachelorstartYear : '',
    bachelorendMonth : '',
    bachelorendYear : '',
    bachelorGrade : '',
  });
  const[master, setMaster] = useState({
    masterField : '',
    masterInstitite : '',
    masterstartMonth : '',
    masterstartYear : '',
    masterendMonth : '',
    masterendYear : '',
    masterGrade : '',
  })
  const[achievement, setAchievement] = useState("");
  const[interest, setInterest] = useState("");
  const[message, setmessage] = useState("");
  const navigate = useNavigate();
      
  useEffect(()=> {
    //getting the studentToken from localstorage
    const studentToken = localStorage.getItem("StudentLoginToken");
    //If the token doesn't exist redirect to the login page        
    if(!studentToken) {
      navigate("/student/login")
    }
  }, [navigate])

  //Checking if the user profile exist
  useEffect(() => {
    const ProfileCheck = async() => {
      const res = await Axios.get("http://localhost:4000/studentprofile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}`
        } 
      })
      console.log(res.data)
      //if the profile exist navigate to the profile page
      if(res.data.length > 0) {
        navigate("/student/profile")
      }else {
        navigate("/student/createprofile")
      }
    }
    ProfileCheck();
  }, [navigate])

  //Creating a handlechange function for onChange in the form for highschool
  const handlechangehighschool = (e) => {
    //preventing the browser from changing the form
    e.preventDefault();
    sethighschool({...highschool, [e.target.name] : e.target.value})
  }

  //Creating a handlechange function for onChange in the form for Bachelor
  const handlechangebachelor = (e) => {
    //preventing the browser from changing the form
    e.preventDefault();
    setBachelor({...bachelor, [e.target.name] : e.target.value})
  }

  //Creating a handlechange function for onChange in the form for Master
  const handlechangemaster = (e) => {
    //preventing the browser from changing the form
    e.preventDefault();
    setMaster({...master, [e.target.name] : e.target.value})
  }

//making a handlesubmit function
const handleSubmit = async (e) => {
  //preventing the browser from submitting the form
  e.preventDefault();

    //appending the data to send to the server side
    const formData = new FormData();

    if(profilePhoto){
    formData.append("profilePhoto", profilePhoto);
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if(about){
    formData.append("about", about);
    }
    if(highestEducation){
    formData.append("highestEducation", highestEducation);
    }
    if(highschool.highschoolcourses){
    formData.append("highschoolcourses", highschool.highschoolcourses);
    }
    if(highschool.course1){
      formData.append("course1", highschool.course1);
    }
    if(highschool.grade1){
      formData.append("grade1", highschool.grade1);
    }
    if(highschool.course2){
      formData.append("course2", highschool.course2);
    }
    if(highschool.grade2){
      formData.append("grade2", highschool.grade2);
    }
    if(highschool.course3){
      formData.append("course3", highschool.course3);
    }
    if(highschool.grade3){
      formData.append("grade3", highschool.grade3);
    }
    if(highschool.course4){
      formData.append("course4", highschool.course4);
    }
    if(highschool.grade4){
      formData.append("grade4", highschool.grade4);
    }
    if(highschool.course5){
      formData.append("course5", highschool.course5);
    }
    if(highschool.grade5){
      formData.append("grade5", highschool.grade5);
    }
    if(highschool.course6){
      formData.append("course6", highschool.course6);
    }
    if(highschool.grade6){
      formData.append("grade6", highschool.grade6);
    }
    if(highschool.course7){
      formData.append("course7", highschool.course7);
    }
    if(highschool.grade7){
      formData.append("grade7", highschool.grade7);
    }
    if(highschool.course8){
      formData.append("course8", highschool.course8);
    }
    if(highschool.grade8){
      formData.append("grade8", highschool.grade8);
    }
    if(highschool.course9){
      formData.append("course9", highschool.course9);
    }
    if(highschool.grade9){
      formData.append("grade9", highschool.grade9);
    }
    if(highschool.course10){
      formData.append("course1", highschool.course10);
    }
    if(highschool.grade10){
      formData.append("grade10", highschool.grade10);
    }
    if(bachelor.bachelorField){
    formData.append("bachelorField", bachelor.bachelorField);
    }
    if(bachelor.bachelorInstitite){
      formData.append("bachelorInstitite", bachelor.bachelorInstitite);
    }
    if(bachelor.bachelorstartMonth){
      formData.append("bachelorstartMonth", bachelor.bachelorstartMonth);
    }
    if(bachelor.bachelorstartYear){
      formData.append("bachelorstartYear", bachelor.bachelorstartYear);
    }
    if(bachelor.bachelorendMonth){
      formData.append("bachelorendMonth", bachelor.bachelorendMonth);
    }
    if(bachelor.bachelorendYear){
      formData.append("bachelorendYear", bachelor.bachelorendYear);
    }
    if(bachelor.bachelorGrade){
      formData.append("bachelorGrade", bachelor.bachelorGrade);
    }
    if(master.masterField){
      formData.append("masterField", master.masterField);
    }
    if(master.masterInstitite){
      formData.append("masterInstitite", master.masterInstitite);
    }
    if(master.masterstartMonth){
      formData.append("masterstartMonth", master.masterstartMonth);
    }
    if(master.masterstartYear){
      formData.append("masterstartYear", master.masterstartYear);
    }
    if(master.masterendMonth){
      formData.append("masterendMonth", master.masterendMonth);
    }
    if(master.masterendYear){
      formData.append("masterendYear", master.masterendYear);
    }
    if(master.masterGrade){
      formData.append("masterGrade", master.masterGrade);
    }
    if(achievement){
    formData.append("achievement", achievement);
    }
    if(interest){
    formData.append("interest", interest);
    }

      //setting the message to empty
      setmessage("")

  try {
    //using the post method to send the request to post the appended data to the following link on the server side
    const res = await Axios.post("http://localhost:4000/studentprofile/createprofile",formData, {
      headers: {
        //getting the generated jwt token from login for authorisation
        "Authorization": `Bearer ${localStorage.getItem("StudentLoginToken")}`,
        //using this to send the image as part of the form to the server data
        "Content-Type": "multipart/form-data"
      }
    })
    //once the profile is created navigate to the following link
    navigate("/student/profile")
    //Getting the message from backend to show the user
    setmessage(res.data.message); 
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot create Your Profile");
  }
}

//Creating the input form
  return(
    <div className="Profilepage">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
    <form onSubmit={handleSubmit}>
      <h1 className="Title">Create Profile</h1>
      
      <div className="ProfilePhoto">
        <label htmlFor="ProfilePhoto" className="textfield">
          Profile Photo:
        </label>
        <input
          name="ProfilePhoto"
          className="profilefield"
          type="file"
          onChange={(e) => setprofilePhoto(e.target.files[0])}
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
          value = {firstName}
          type="text"
          className="inputfield"
          onChange={(e) => setfirstName(e.target.value)}
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
          value = {lastName}
          type="text"
          className="inputfield"
          onChange={(e) => setlastName(e.target.value)}
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
          onChange={(e) => setAbout(e.target.value)}
          className="inputfield"
        />
      </div>
      {
        //choosing the highest level of education from the dropdown
      }
      <div className="education">
        <div className="highestEducation">
          <label htmlFor="highestEducation" className="textfield">
          Highest level of Education:
          </label>
          <select
            name = "highestEducation"
            value = {highestEducation}
            className="inputfield"
            onChange={e => {
              sethighestEducation(e.target.value);
              setBachelor({
                bachelorField : '',
                bachelorInstitite : '',
                bachelorstartMonth : '',
                bachelorstartYear : '',
                bachelorendMonth : '',
                bachelorendYear : '',
                bachelorGrade : '',
              })
              sethighschool ({
                highschoolcourses : '',
                course1 : '',
                grade1 : '',
                course2 : '',
                grade2 : '',
                course3 : '',
                grade3 : '',
                course4 : '',
                grade4 : '',
                course5 : '',
                grade5 : '',
                course6 : '',
                grade6 : '',
                course7 : '',
                grade7 : '',
                course8 : '',
                grade8 : '',
                course9 : '',
                grade9 : '',
                course10 : '',
                grade10 : '',
              })
              setMaster({
                masterField : '',
                masterInstitite : '',
                masterstartMonth : '',
                masterstartYear : '',
                masterendMonth : '',
                masterendYear : '',
                masterGrade : '',
              })
            }}
            required >
              <option value = ""> Select the Highest Education</option>
              <option value = "highschool"> High School</option> 
              <option value = "Bachelor"> Bachelor Degree</option> 
              <option value = "Master"> Master Degree</option> 
          </select>
        </div>
        {
          //If the user choose highschool show the below form
        }
        {highestEducation === "highschool" && (
          <div>
            {
              //choosing the course type from the dropdown
            }
            <div className="Coursestaken">
              <label htmlFor="courses" className = "textfield">
                Courses
              </label>
              
              <select
                name = "highschoolcourses"
                value = {highschool.highschoolcourses}
                className="inputfield"
                onChange={handlechangehighschool}
              >
                <option value = ""> Select the Type of Education after GCSE</option>
                <option value = "alevels"> A levels</option> 
                <option value = "IB"> IB</option> 
                <option value = "btec"> BTEC diplomas </option> 
                <option value = "tlevels"> T levels</option> 
              </select>
            </div>
            {
              //If the user choose alevels show the below form
            }
            {highschool.highschoolcourses === "alevels" && (
              <div>
                <div className="course">
                  <label htmlFor="course" className="textfield">
                    Course Name:
                  </label>
                  <input
                    placeholder="Enter Course Name "
                    name="course1"
                    value = {highschool.course1}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade1"
                    value = {highschool.grade1}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course2}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade2"
                    value = {highschool.grade2}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course3}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade3"
                    value = {highschool.grade3}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course4}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade4"
                    value = {highschool.grade4}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course5}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade5"
                    value = {highschool.grade5}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course6}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade6"
                    value = {highschool.grade6}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course7}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade7"
                    className="inputfield"
                    value = {highschool.grade7}
                    onChange={handlechangehighschool}
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
                    value = {highschool.course8}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade8"
                    value = {highschool.grade8}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course9}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade9"
                    value = {highschool.grade9}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course10}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade10"
                    value = {highschool.grade10}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
            {
              //If the user choose IB show the below form
            }
            {highschool.highschoolcourses === "IB" && (
              <div>
                <div className="course">
                  <label htmlFor="course" className="textfield">
                    Course Name:
                  </label>
                  <input
                    placeholder="Enter Course Name "
                    name="course1"
                    value = {highschool.course1}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade1"
                    value = {highschool.grade1}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course2}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade2"
                    value = {highschool.grade2}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course3}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade3"
                    value = {highschool.grade3}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course4}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade4"
                    value = {highschool.grade4}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course5}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade5"
                    value = {highschool.grade5}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course6}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade6"
                    value = {highschool.grade6}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course7}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade7"
                    value = {highschool.grade7}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course8}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade8"
                    value = {highschool.grade8}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course9}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade9"
                    value = {highschool.grade9}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course10}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade10"
                    value = {highschool.grade10}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
            {
              //If the user choose btec show the below form
            }
            {highschool.highschoolcourses === "btec" && (
              <div>
                <div className="course">
                  <label htmlFor="course" className="textfield">
                    Course Name:
                  </label>
                  <input
                    placeholder="Enter Course Name "
                    name="course1"
                    value = {highschool.course1}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade1"
                    value = {highschool.grade1}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course2}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade2"
                    value = {highschool.grade2}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course3}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade3"
                    value = {highschool.grade3}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course4}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade4"
                    value = {highschool.grade4}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course5}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade5"
                    value = {highschool.grade5}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course6}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade6"
                    value = {highschool.grade6}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course7}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade7"
                    value = {highschool.grade7}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course8}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade8"
                    value = {highschool.grade8}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course9}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade9"
                    value = {highschool.grade9}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course10}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade10"
                    value = {highschool.grade10}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
            {
              //If the user choose tlevels show the below form
            }
            {highschool.highschoolcourses === "tlevels" && (
              <div>
                <div className="course">
                  <label htmlFor="course" className="textfield">
                    Course Name:
                  </label>
                  <input
                    placeholder="Enter Course Name "
                    name="course1"
                    value = {highschool.course1}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade1"
                    value = {highschool.grade1}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course2}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade2"
                    value = {highschool.grade2}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course3}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade3"
                    value = {highschool.grade3}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course4}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade4"
                    value = {highschool.grade4}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course5}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade5"
                    value = {highschool.grade5}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course6}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade6"
                    value = {highschool.grade6}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course7}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade7"
                    value = {highschool.grade7}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course8}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade8"
                    value = {highschool.grade8}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course9}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade9"
                    value = {highschool.grade9}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
                    value = {highschool.course10}
                    type="text"
                    className="inputfield"
                    onChange={handlechangehighschool}
                  />
                  <label htmlFor="grade" className="textfield">
                    Grade for the course:
                  </label>
                  <select
                    name = "grade10"
                    value = {highschool.grade10}
                    className="inputfield"
                    onChange={handlechangehighschool}
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
        {
          //If the user choose Bachelor show the below form
        }
        {highestEducation === "Bachelor" && (
          <div>
            <div className="field">
              <label htmlFor="field" className="textfield">
                Field of Study:
              </label>
              <input
                placeholder="Enter Your field of study"
                name="bachelorField"
                value= {bachelor.bachelorField}
                type="text"
                className="inputfield"
                onChange={handlechangebachelor}
              />
            </div>
            <div className="institute">
              <label htmlFor="institute" className="textfield">
                Educational Institute name:
              </label>
              <input
                placeholder="Enter Your Educational Institute name"
                name="bachelorInstitite"
                value= {bachelor.bachelorInstitite}
                type="text"
                className="inputfield"
                onChange={handlechangebachelor}
              />
            </div>
            <div className="startDate">
              <label htmlFor="startDate" className="textfield">
                Start Date:
              </label>
              <select 
                name = "bachelorstartMonth"
                value = {bachelor.bachelorstartMonth}
                className="inputfield"
                onChange={handlechangebachelor}
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
                value = {bachelor.bachelorstartYear}
                className="inputfield"
                onChange={handlechangebachelor}
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
                value = {bachelor.bachelorendMonth}
                className="inputfield"
                onChange={handlechangebachelor}
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
                value = {bachelor.bachelorendYear}
                className="inputfield"
                onChange={handlechangebachelor}
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
            <div className = "grade">
            <label htmlFor="Bachelorgrade" className="textfield">
                Bachelor Degree Grade:
              </label>
              <select
                name = "bachelorGrade"
                value = {bachelor.bachelorGrade}
                className="inputfield"
                onChange={handlechangebachelor}
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
        {
          //If the user choose Master show the below form
        }
        {highestEducation === "Master" && (
          <div>
            <div className="field">
              <label htmlFor="field" className="textfield">
                Field of Study:
              </label>
              <input
                placeholder="Enter Your field of study"
                value ={master.masterField}
                name="masterField"
                type="text"
                className="inputfield"
                onChange={handlechangemaster}
              />
            </div>
            <div className="institute">
              <label htmlFor="institute" className="textfield">
                Educational Institute name:
              </label>
              <input
                placeholder="Enter Your Educational Institute name"
                value={master.masterInstitite}
                name="masterInstitite"
                type="text"
                className="inputfield"
                onChange={handlechangemaster}
              />
            </div>
            <div className="startDate">
              <label htmlFor="startDate" className="textfield">
                Start Date:
              </label>
              <select 
                name = "masterstartMonth"
                value = {master.masterstartMonth}
                className="inputfield"
                onChange={handlechangemaster}
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
                value = {master.masterstartYear}
                className="inputfield"
                onChange={handlechangemaster}
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
                value = {master.masterendMonth}
                className="inputfield"
                onChange={handlechangemaster}
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
                value = {master.masterendYear}
                className="inputfield"
                onChange={handlechangemaster}
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
            <div className="grade">
            <label htmlFor="masterGrade" className="textfield">
                MASTER Degree Grade:
              </label>
              <select
                name = "masterGrade"
                value={master.masterGrade}
                className="inputfield"
                onChange={handlechangemaster}
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
          value={achievement}
          type="text"
          className="inputfield"
          onChange={(e) => setAchievement(e.target.value)}
        />
      </div>
      <div className="interest">
        <label htmlFor="interest" className="textfield">
        Interests:
        </label>
        <input
          placeholder="Enter Your Interests"
          name="interest"
          value={interest}
          type="text"
          className="inputfield"
          onChange={(e) => setInterest(e.target.value)}
        />
      </div>
      <div className="CreateProfileButton">
        <button className="SubmitButton">Create Profile</button>
      </div>
      {
        //Message to display to the users
      }
      <div className="message for user">{message}</div>
    </form>
  </div>
  );
}; 

//exporting the StudentProfile function for use
export default StudentProfile;
