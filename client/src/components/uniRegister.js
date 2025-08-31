//importing the react library
import React, {useEffect} from "react";
//importing link from react-router-dom
import {Link, useNavigate} from "react-router-dom"
//importing the style sheet
import "../styling/uniRegister.css"

//creating uniregister function
const UniRegister = () => {

    const navigate = useNavigate();
      
    useEffect(()=> {
        //getting the universitytoken from localstorage
        const universityToken = localStorage.getItem("UniversityLoginToken");
                        
        //If the token doesn't exist redirect to the login page
        if(universityToken) {
            navigate("/university/createprofile")
        }
    }, [navigate])
    
    return(
    <div className="uniregister">
        <div>
            <h1 className="UniLoginTitle">Welcome to eduworld</h1>
        </div>
        <div>
            <p className = "information">For registering your university with this website please email throught the official university email to xyz@gmail.com</p>
        </div>
        <div className="UniversityLogin">
            <Link to="/university/login">
                <button className="account" href="/university/login">
                    Already have an account
                </button>
            </Link>
        </div>
        <div className="loginPage">
            <Link to="/university/registertheuni">
                <button className="account" href="/university/registertheuni">
                    University Register Form 
                </button>
            </Link>
        </div>
    </div>
    )
}

//exporting the uniRegister function for use
export default UniRegister;