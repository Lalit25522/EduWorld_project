//import React, useState, useEffect from react
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import useNavigate from the react-router-dom
import {useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/article.css"

//creating the article function
const Article = () => {
  //Using the Usestate to add the state variables to components
  const[articleTitle, setarticleTitle] = useState("");
  const[articleContent, setarticleContent] = useState("");
  const[articlePicture, setarticlePicture] = useState(null)
  const[message, setmessage] = useState("")
  const navigate = useNavigate();
  
  useEffect(()=> {
      //getting the studentToken from localstorage
      const studentToken = localStorage.getItem("StudentLoginToken");
      //If the token doesn't exist redirect to the login page        
      if(!studentToken) {
        navigate("/student/login")
      }
    }, [navigate])

//making a handlesubmit function
const handleSubmit = async (e) => {
  //preventing the browser from submitting the form
  e.preventDefault();

   //appending the data to send to the server side
  const formData = new FormData();
  formData.append("articleTitle", articleTitle);
  formData.append("articleContent", articleContent);
  if(articlePicture){
    formData.append("articlePicture", articlePicture)
  }
    //setting the message to empty
  setmessage("")
  try {
    //using the post method to send the request to post the appended data to the following link on the server side
    const res = await Axios.post("http://localhost:4000/article/create", formData, {
      headers: {
        //getting the generated jwt token from login for authorisation
        "Authorization": `Bearer ${localStorage.getItem("StudentLoginToken")}`,
        //using this to send the image as part of the form to the server data
        "Content-Type": "multipart/form-data"
      }
    })
    //once the article is created navigate to the following link
    navigate("/article")
    //Getting the message from backend to show the user
    setmessage(res.data.message); 
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot create Your Article");
  }
}
//Creating the input form
  return(
    <div className="Article">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
    <form onSubmit={handleSubmit}>
      <h1 className="Title">Article Page</h1>
      <div className="articleTitle">
        <label htmlFor="articleTitle" className="textfield">
          Article Title:
        </label>
        <input
          placeholder="Enter Article Title"
          name="articleTitle"
          type="text"
          value={articleTitle}
          className="inputfield"
          onChange={(e) => setarticleTitle(e.target.value)}
          required
        />
      </div>
      <div className="articleContent">
        <label htmlFor="articleContent" className="textfield">
          Article Content:
        </label>
        <input
          placeholder="Enter Article Content"
          name="articleContent"
          type="text"
          value={articleContent}
          className="inputfield"
          onChange={(e) => setarticleContent(e.target.value)}
          required
        />
      </div>
      <div className="articlePicture">
        <label htmlFor="articlePicture" className="textfield">
          Article Photo:
        </label>
        <input
          name="articlePicture"
          type="file"
          onChange={(e) => setarticlePicture(e.target.files[0])}
          accept=".png, .jpeg, .jpg"
        />
      </div>
      <div className="articlebutton">
        <button className="SubmitButton">Create Article</button>
      </div>
      {
        //Message to display to the users
      }
      <div className="message for user">{message}</div>
    </form>
  </div>
  );
}; 

//exporting the article function for use
export default Article;
