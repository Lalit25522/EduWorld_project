//import the style foe the page
import '../styling/App.css';
//import BrowserRouter, Routes and Route from the react-router-dom
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//Important various components to give a route in the front end
import StudentRegister from "./studentRegister";
import Home from "./Home";
import StudentLogin from "./studentLogin";
import UniversityRegister from "./uniRegister";
import UniversityLogin from "./uniLogin";
import UniversityRegisterForm from "./uniRegisterForm.js";
import StudentCreateProfile from "./createProfile.js";
import StudentProfile from "./myprofile.js"
import UniversityCreateProfile from "./uniCreateProfile.js";
import UniversityProfile from "./uniProfile.js"
import PostCreate from "./post.js";
import Allpost from "./allPost.js"
import Post from "./mypost.js"
import ArticleCreate from "./Article.js";
import Article from "./myarticle.js"
import Allarticle from "./allArticle.js"
import ApplicationCreate from "./Application.js"
import Allapplication from "./allApplication.js"
import Application from "./myApplication.js";
import SearchProfile from "./searchProfile.js"
import SearchuniProfile from "./searchuniprofile.js"
import Messaging from "./Messaging.js"
import ForgotPassword from "./forgotPassword.js";
import ResetPassword from "./resetPassword.js";
import UniForgotPassword from "./uniforgotPassword.js";
import UniResetPassword from "./uniresetPassword.js";
import VerifyEmail from './emailVerification.js';
import Navbar from "./navigation.js"

//creating the function
function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {
            //Providing various routes to various components for access in the front end
          }
          <Route path="/" element={<Home/>}/>
          <Route path="/student/register" element={<StudentRegister/>}/>
          <Route path="/student/login" element={<StudentLogin/>}/>
          <Route path="/university/register" element= {<UniversityRegister/>}/>
          <Route path="/university/login" element= {<UniversityLogin/>}/>
          <Route path="/university/registertheuni" element= {<UniversityRegisterForm/>}/>
          <Route path="/student/createprofile" element= {<StudentCreateProfile/>}/>       
          <Route path="/student/profile" element= {<StudentProfile/>}/>
          <Route path="/university/createprofile" element= {<UniversityCreateProfile/>}/>  
          <Route path="/university/profile" element= {<UniversityProfile/>}/>       
          <Route path="/post/create" element = {<PostCreate/>}/>
          <Route path="/post" element = {<Allpost/>}/>
          <Route path="/mypost" element = {<Post/>}/>
          <Route path= "/article/create" element = {<ArticleCreate/>}/>
          <Route path= "/article" element = {<Allarticle/>}/>
          <Route path= "/myarticle" element = {<Article/>}/>
          <Route path= "/searchProfile/:profileId" element={<SearchProfile/>}/>
          <Route path= "/searchProfile/uni/:universityprofileId" element={<SearchuniProfile/>}/>
          <Route path= "/application/create" element = {<ApplicationCreate/>}/>
          <Route path= "/application" element = {<Allapplication/>}/>
          <Route path= "/myapplication" element = {<Application/>}/>
          <Route path="/message/:receiverId" element = {<Messaging/>}/>
          <Route path= "/message" element={<Messaging/>}/>
          <Route path= "/student/forgotpassword" element={<ForgotPassword/>}/>
          <Route path= "/student/resetPassword/:resetToken" element={<ResetPassword/>}/>
          <Route path= "/university/forgotpassword" element={<UniForgotPassword/>}/>
          <Route path= "/university/resetPassword/:resetToken" element={<UniResetPassword/>}/>
          <Route path= "/student/verify/:verifyToken" element={<VerifyEmail/>}/>
        </Routes>
      </BrowserRouter>
  );
}

// Exporting the App function
export default App;
