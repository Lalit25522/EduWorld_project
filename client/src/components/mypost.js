//import React, useState and useeffect from React
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
//import useNavigate from the react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/mypost.css"

//Create the posts function
const Posts = () => {
    //Using the Usestate to add the state variables to components
    const [postinfo, setPostinfo] = useState([]);
    const [message, setMessage] = useState("");
    const [editPost, setEditPost] = useState(null);
    const [editPostContent, seteditPostContent] = useState({ postContent: "", postPicture: "" });
    const navigate = useNavigate();

    useEffect(()=> {
        //getting the studentToken from localstorage
        const studentToken = localStorage.getItem("StudentLoginToken");
        //If the token doesn't exist redirect to the login page        
        if(!studentToken) {
            navigate("/student/login")
        }
    }, [navigate])

    //Using the useeffect to fetch user posts 
    useEffect(() => {
        retrievePosts();
    }, []);

    //Creating the retrievePosts function
    const retrievePosts = async () => {
        try {
            //Getting the posts created by user by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/post/mypost", {
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

    //Creating the handleEdit form function
    const handleEditForm = (id, postContent, postPicture) => {
        //updating the editpost state with the id
        setEditPost(id);
        //updating the editPostContent state with the information from server 
        seteditPostContent({ postContent, postPicture}); 
    };

    //Creating a handleSubmit function
    const handleSubmit = async (e) => {
        //preventing the browser from submitting the form
        e.preventDefault();
        //setting the message to empty 
        setMessage("")

        //appending the edited data to send to the server side
        const formData = new FormData();
        formData.append("postContent", editPostContent.postContent);
        if (editPostContent.postPicture) {
            formData.append("postPicture", editPostContent.postPicture);
        }

        try {
            //using the put method to send the request to updated the appended data to the following link on the server side for a specific post
            const res = await axios.put(`http://localhost:4000/post/${editPost}`,formData, {
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
            setEditPost(null); 
            //retrieve the posts again
            retrievePosts();
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot Update Your Post");
        }
    };
    //Creating a handledelete function
    const handledelete = async(postId) => {
        try {
            //using the delete method to send the request to delete the post through the following link on the server side
            const res = await axios.delete(`http://localhost:4000/post/${postId}`, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem('StudentLoginToken')}` }
            });
            //updating the postinfo state by removing the post according to id from the array
            setPostinfo(postinfo.filter((post) => post._id !== postId));
            //setting the message to show the user 
            setMessage(res.data.message)
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot Delete Your Post");
        }
    }
//Creating the display page for posts and edit form
    return (
        <div>
            <h2 className = "Title"> My Posts</h2>
            {
                //Creating the edit form and filling the fields with the previous data from database to update it 
                // This form is only shown once the person hits edit button
            }
            {editPost ? (
                <div className="Post">
                    <form onSubmit={handleSubmit}>
                        <div className="postContent">
                            <label htmlFor="postContent" className="textfield">
                                Post:
                            </label>
                            <input
                                type="text"
                                name="postContent"
                                placeholder="postContent"
                                className="inputfield"
                                value={editPostContent.postContent}
                                onChange={(e) => seteditPostContent({...editPostContent, postContent:e.target.value})}
                            />
                            </div>
                            <div className="postPicture">
                            <label htmlFor="postPicture" className="textfield">
                                Post Photo:
                            </label>
                            <input
                                type="file"
                                name="postPicture"
                                accept=".png, .jpeg, .jpg"
                                onChange={(e) => seteditPostContent({ ...editPostContent, postPicture: e.target.files[0] })}
                            />
                        </div>
                        {
                            //updating the post
                        }
                        <div className="updateButton">
                            <button className="submit">Update Post</button>
                        </div>
                    </form>
                    {
                        //cancelling the edit post request
                    }
                    <div className="cancelButton">
                        <button className = "cancel" onClick={() => setEditPost(null)}>Cancel Edit</button>
                    </div>
                </div>
            ) : (
            <div>
                {postinfo.map((postinfo) => (
                    <div className="Post" key={postinfo._id}>
                        {
                            //showing the post data from the database
                        }
                        <div>
                            <p className="details" >{postinfo.postContent}</p>
                        </div>
                        <div>
                            {<img className = "Image" src={postinfo.postPicture} alt="postPicture"/>}
                        </div>
                        {
                            //creating the edit button which will fill the previous data in the edit form once the user press the button
                        }
                        <div>
                            <button className = "submit" onClick={() => handleEditForm(postinfo._id, postinfo.postContent, postinfo.postPicture)}>
                                Edit
                            </button>
                        </div>
                        {
                            //Deletes the post using the id once the user clicks the button
                        }
                        <div>
                            <button className = "cancel" onClick={() => handledelete(postinfo._id)}>Delete Post </button>
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

//exporting the posts function for use
export default Posts;
