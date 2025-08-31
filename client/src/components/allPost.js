//import React, useState and useeffect from react
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
// import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/mypost.css"

//Create the AllPosts function
const AllPosts = () => {
    //Using the Usestate to add the state variables to components
    const [postinfo, setPostinfo] = useState([]);
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

    //Using the useeffect to fetch the posts
    useEffect(() => {
        retrievePosts();
    }, []);

    //Creating the retrievePosts function
    const retrievePosts = async () => {
        try {
            //Getting all posts created by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/post", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            //updating the postinfo state with post data from the server
            setPostinfo(res.data);
        } catch (error) {
            //If something goes wrong show this error to the user
            setMessage("Server Error. Cannot Show Your Posts");
        }
    };

    //Creating the display page for post
    return (
        <div>
            <h1 className="TopTitle">All Posts</h1>
            {postinfo.map((postinfo) => (
                <div className="Post"  key={postinfo._id}>
                        {
                            //showing the post data from the database
                        }
                    <div>
                        <p className="details">{postinfo.postContent}</p>
                    </div>
                    <div>
                        {<img className = "Image" src={postinfo.postPicture} alt="postPicture"/>}
                    </div>
                </div>
            ))}
            {
                //Showing the messages to the users
            }
            <div className="message for user">{message}</div>
        </div>
    )

}

//exporting the AllPosts function for use
export default AllPosts;