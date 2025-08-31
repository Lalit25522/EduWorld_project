//import React, useState and useeffect from React
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
//import useNavigate from the react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/myarticle.css"

//Create the Articles function
const Articles = () => {
    //Using the Usestate to add the state variables to components
    const [articleinfo, setArticleinfo] = useState([]);
    const [message, setMessage] = useState("");
    const [editArticle, setEditArticle] = useState(null);
    const [editArticleContent, seteditArticleContent] = useState({ articleTitle: "", articleContent: "", articlePicture: "" });
    const navigate = useNavigate();
    
    useEffect(()=> {
        //getting the studentToken from localstorage
        const studentToken = localStorage.getItem("StudentLoginToken");
        //If the token doesn't exist redirect to the login page        
        if(!studentToken) {
            navigate("/student/login")
        }
    }, [navigate])

    //Using the useeffect to fetch user article 
    useEffect(() => {
        retrieveArticles();
    }, []);

    //Creating the retrieveArticles function
    const retrieveArticles = async () => {
        try {
            //Getting the articles created by user by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/article/myarticle", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            //updating the articleInfo state with article data from the server
            setArticleinfo(res.data);
        } catch (error) {
            //If something goes wrong show this error to the user
            setMessage("Server Error. Cannot Show Your Articles");
        }
    };

    //Creating the handleEdit form function
    const handleEditForm = (id, articleTitle, articleContent, articlePicture) => {
        //updating the editArticle state with the id
        setEditArticle(id);
        //updating the editArticleContent state with the information from server 
        seteditArticleContent({ articleTitle, articleContent, articlePicture}); 
    };

    //Creating a handleSubmit function
    const handleSubmit = async (e) => {
        //preventing the browser from submitting the form
        e.preventDefault();
        //setting the message to empty 
        setMessage("")

        //appending the edited data to send to the server side
        const formData = new FormData();
        formData.append("articleTitle", editArticleContent.articleTitle);
        formData.append("articleContent", editArticleContent.articleContent);
        if (editArticleContent.articlePicture) {
            formData.append("articlePicture", editArticleContent.articlePicture);
        }

        try {
            //using the put method to send the request to updated the appended data to the following link on the server side for a specific article
            const res = await axios.put(`http://localhost:4000/article/${editArticle}`,formData, {
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
            setEditArticle(null);
            //retrieve the articles again 
            retrieveArticles();
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot Update Your Article");
        }
    };

    //Creating a handledelete function
    const handledelete = async(articleId) => {
        try {
            //using the delete method to send the request to delete the article through the following link on the server side
            const res = await axios.delete(`http://localhost:4000/article/${articleId}`, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem('StudentLoginToken')}` }
            });
            //updating the articleinfo state by removing the article according to id from the array
            setArticleinfo(articleinfo.filter((article) => article._id !== articleId));
            //setting the message to show the user 
            setMessage(res.data.message)
        } catch (error) {
            //Showing this error in case something goes wrong
            setMessage("Server Error. Cannot delete Your Article");
        }
    }

//Creating the display page for articles and edit form
    return (
        <div>
            <h2 className="TopTitle"> My Articles </h2>
            {
                //Creating the edit form and filling the fields with the previous data from database to update it 
                // This form is only shown once the person hits edit button
            }
            {editArticle ? (
                <div className= "Article">
                    <form onSubmit={handleSubmit}>
                        <div className="articleTitle">
                            <label htmlFor="articleTitle" className="textfield">
                                Article Title:
                            </label>
                            <input
                                type="text"
                                name="articleTitle"
                                placeholder="articleTitle"
                                className="inputfield"
                                value={editArticleContent.articleTitle}
                                onChange={(e) => seteditArticleContent({...editArticleContent, articleTitle:e.target.value})}
                            />
                            </div>
                            <div className="articleContent">
                            <label htmlFor="articleContent" className="textfield">
                                Article Content:
                            </label>
                            <input
                                type="text"
                                name="articleContent"
                                placeholder="articleContent"
                                className="inputfield"
                                value={editArticleContent.articleContent}
                                onChange={(e) => seteditArticleContent({...editArticleContent, articleContent:e.target.value})}
                            />
                            </div>
                            <div className="articlePicture">
                            <label htmlFor="articlePicture" className="textfield">
                                Article Photo:
                            </label>
                            <input
                                type="file"
                                name="articlePicture"
                                accept=".png, .jpeg, .jpg"
                                onChange={(e) => seteditArticleContent({ ...editArticleContent, articlePicture: e.target.files[0] })}
                            />
                            </div>
                            {
                                //updating the article
                            }
                            <div className="updateButton">
                                <button className="submit">Update Article</button>
                            </div>
                    </form>
                    {
                        //cancelling the edit article request
                    }
                    <div className="cancelButton">
                        <button className = "cancel" onClick={() => setEditArticle(null)}>Cancel Edit</button>
                    </div>
                </div>
            ) : (
            <div>
                {articleinfo.map((articleinfo) => (
                    <div className= "Article" key={articleinfo._id}>
                        {
                            //showing the article data from the database
                        }
                        <div>
                            <h3 className="articletitle">{articleinfo.articleTitle}</h3>
                            <p className="details">{articleinfo.articleContent}</p>
                        </div>
                        <div>
                            {<img className="Image" src={articleinfo.articlePicture} alt="articlePicture"/>}
                        </div>
                        <div>
                        {
                            //creating the edit button which will fill the previous data in the edit form once the user press the button
                        }
                            <button className = "submit" onClick={() => handleEditForm(articleinfo._id, articleinfo.articleTitle, articleinfo.articleContent, articleinfo.articlePicture)}>
                                Edit
                            </button>
                        </div>
                        {
                            //Deletes the article using the id once the user clicks the button
                        }
                        <div>
                            <button className = "cancel" onClick={() => handledelete(articleinfo._id)}>Delete Article </button>
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

//exporting the Articles function for use
export default Articles;
