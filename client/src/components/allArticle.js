//import React, useState and useeffect from react
import React, { useState, useEffect } from 'react';
//import the axios library
import axios from 'axios';
// import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
//importing the style sheet
import "../styling/myarticle.css"

//Create the Allarticles function
const Allarticles = () => {
    //Using the Usestate to add the state variables to components
    const [articleinfo, setArticleinfo] = useState([]);
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

    //Using the useeffect to fetch the articles 
    useEffect(() => {
        retrieveArticles();
    }, []);

    //Creating the retrieveArticles function
    const retrieveArticles = async () => {
        try {
            //Getting all articles created by sending the request through the following link from the server side
            const res = await axios.get("http://localhost:4000/article", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            //updating the articleInfo state with article data from the server
            setArticleinfo(res.data);
        } catch (error) {
            //If something goes wrong show this error to the user
            setMessage("Server Error. Cannot Show all Articles");
        }
    };

//Creating the display page for articles  
    return (
            <div>
                <h1 className="TopTitle">All Articles</h1>
                {articleinfo.map((articleinfo) => (
                    <div className= "Article"  key={articleinfo._id}>
                        {
                            //showing the article data from the database
                        }
                        <div>
                            <h2 className="articletitle">{articleinfo.articleTitle}</h2>
                        </div>
                        <div>
                            <p className="details">{articleinfo.articleContent}</p>
                        </div>
                        <div>
                            {<img className="Image" src={articleinfo.articlePicture} alt="articlePicture"/>}
                        </div>
                    </div>
                ))}
            {
                //Showing the messages to the users
            }
                <div className="message for user">{message}</div>
            </div>
    )

};

//exporting the Allarticles function for use
export default Allarticles;