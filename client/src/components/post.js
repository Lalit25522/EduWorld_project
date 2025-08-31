//import React, useState, useEffect from react
import React, {useState, useEffect} from "react";
//import the axios library
import Axios from "axios";
//import useNavigate from the react-router-dom
import {useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/post.css"

//creating the post function
const Post = () => {
  //Using the Usestate to add the state variables to components
  const[postContent, setpostContent] = useState("");
  const[postPicture, setpostPicture] = useState(null);
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
  formData.append("postContent", postContent);
  if(postPicture){
    formData.append("postPicture", postPicture)
  }
    //setting the message to empty
  setmessage("")
  try {
    //using the post method to send the request to post the appended data to the following link on the server side
    const res = await Axios.post("http://localhost:4000/post/create", formData, {
      headers: {
        //getting the generated jwt token from login for authorisation
        "Authorization": `Bearer ${localStorage.getItem("StudentLoginToken")}`,
        //using this to send the image as part of the form to the server data
        "Content-Type": "multipart/form-data"
      }
    })
    //once the post is created navigate to the following link
    navigate("/post")
    //Getting the message from backend to show the user
    setmessage(res.data.message); 
  } catch (error) {
    // show the error message in case something goes wrong
    setmessage("Server Error. Cannot Create Your Post");
  }
}
//Creating the input form
  return(
    <div className="Post">
      {
        //creating a form that will execute handleesubmit function on submitting the form
      }
    <form onSubmit={handleSubmit}>
      <h1 className="Title">Post Page</h1>
      <div className="postContent">
        <label htmlFor="postContent" className="textfield">
          Post:
        </label>
        <input
          placeholder="What's On Your Mind"
          name="postContent"
          type="text"
          value={postContent}
          className="inputfield"
          onChange={(e) => setpostContent(e.target.value)}
          required
        />
      </div>
      <div className="postPicture">
        <label htmlFor="postPicture" className="textfield">
          Post Photo:
        </label>
        <input
          name="postPicture"
          type="file"
          onChange={(e) => setpostPicture(e.target.files[0])}
          accept=".png, .jpeg, .jpg"
        />
      </div>
      {postPicture && (
        <div className="imagePreview">
          <img
            src={URL.createObjectURL(postPicture)}
            alt="Preview"
            className="previewImg"
          />
        </div>
      )}
      <div className="postbutton">
        <button className="SubmitButton">Post</button>
      </div>
      {
        //Message to display to the users
      }
      <div className="message for user">{message}</div>
    </form>
  </div>
  );
}; 

//exporting the post function for use
export default Post;
