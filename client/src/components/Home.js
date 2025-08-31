//import the react library
import React from "react";
//import link from the react-router-dom
import {Link} from "react-router-dom"
//importing the style sheet
import "../styling/Home.css"

//creating Home function
const Home = () => {
    //Creating the home page
    return(
    <div className="HomePage">
        <h1 className="HomeTitle">Welcome to eduworld</h1>
        {
            //Link to student registration
        }
        <div className="StudentRegister">
            <Link to="/student/register">
                <button className="StuRegister" href="/student/register">
                    Student Register
                </button>
            </Link>
        </div>
        <div className="UniversityRegister">
            {
                //link to university registration
            }
            <Link to="/university/register">
                <button className="UniRegister" href="/university/register">
                    University Register
                </button>
            </Link>
        </div>
    </div>
    )
}

//export the Home function for use
export default Home;