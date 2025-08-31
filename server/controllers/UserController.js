//importing the user Model
import userModel from "../models/Users.js";
//importing the bcrypt
import bcrypt from "bcrypt";
//import nodemailer
import {sendEmail} from "../storage/nodemailer.js";
//importing the json web token
import jwt from "jsonwebtoken";
//importing to get credentials from .env file
import {} from "dotenv/config";

//Getting the jwt token from the .env file
const JWT = process.env.JWT_Token;

//Creating the registration function
export const register = async(req, res) => {
    //Extract the email and password from the req.body
    const {email, password } = req.body;
    console.log(email)

    //Trying to find the email that the user put in to register to see if it already exists in the database
    const user = await userModel.findOne({email: email})

    //if the email exist give this message to the user
    if(user) {
        return res.status(500).json({message: "The email address is already associated with an account"})
    }
    //Hash the password that the user provided before storing it in database for security
    const hashpassword = await bcrypt.hash(password, 15);
    try{
    //creating a new instance newuser using the user Model and providing the email and hashpassword
    const newsingedUser= new userModel({email,password:hashpassword});
    //Saving the newuser to the database
    const savedUser = await newsingedUser.save();
    //Create a verification Token
    const verificationToken = jwt.sign({ email: savedUser.email }, JWT, { expiresIn: "1h" });

    //Creating the url for reset
    const verifyURL = `http://localhost:3000/student/verify/${verificationToken}`

    //Creating Email Subject
    const emailsubject = "Please verify your email"

    //Creating the email body
    const emailhtml = `
      <h1>Please Verify your Email</h1>
      <p>Thank you for registering to EduWorld. To verify your email, please click the link below:</p>
      <a href=${verifyURL} style="padding: 10px 15px; background-color: #FFBB00;">Verify email</a>
      <p>If you did not request this change, please ignore this email.</p>`

    //using the sendEmail to send the mail
    await sendEmail (savedUser.email, emailsubject, emailhtml)

    //If the user is successfully registered show this message
    return res.status(200).json({ message: "The user has been successfully created. Please verify before logging in" });
    } catch (error) {
      console.log(error)
      //If the user cannot be registered show this message
      return res.status(400).json({ message: "Server Error. Can not register a new user. Please try again later."});
    }
}

export const verifyEmail = async(req, res) => {
  //Extract resetToken and password from req.body
  const {verifyToken} = req.body 

  try {
    // if token exist compare the jwttoken received above with the token in the .env file to see if it verifies and then decode it 
    const decoded = jwt.verify(verifyToken, JWT);

    //Trying to find the email that the user put in to register to see if it already exists in the database
    const user = await userModel.findOne({email: decoded.email})

    //if the email does not exist give this message to the user
    if(!user) {
      return res.status(400).json({message: "Sorry the user cannot be found"})
    }

    user.Verified = true

    //saving the new password in database 
    await user.save();
    //show this message if the password is successfully updated
    return res.status(200).json({ message: "Email is verified successfully" });
  } catch (error) {
      //If the user cannot be update the password show this message
      return res.status(400).json({ message: "Server Error. Can not update the password. Please try again later."});
    }
}

//Creating the login function
export const login = async(req, res) => {
  //Extract the email and password from the req.body
  const {email, password } = req.body;
  try{
  //Trying to find the email that the user put in to see if it exists in the database
  const user = await userModel.findOne({email: email})
  
  //If the email is not in the database show this message to the user
  if(!user) {
      return res.status(404).json({message: "There is no User with this email address"})
  }

  if(!user.Verified) {
    return res.status(400).json({message: "Please verify your email before logging in"})
  }
  
  //Otherwise match the password the user entered to the hashed password in the database
  const matchpassword = await bcrypt.compare(password, user.password);
  //If the password does not match show the following message to the user
  if(!matchpassword){
      return res.status(400).json({message: "Credentials don't match"})
  }
  //If the password is correct create the jwt token and login the user
  const jwttoken = jwt.sign({ userId: user._id }, JWT, { expiresIn: "7d" });

  //pass the jwttoken to the client
  res.status(200).json({jwttoken})
  }  catch{
    //If the user can not be logged in because of some error show this message
      return res.json({message: "Server Error. Can not login to the website. Please try again later"})
  }
}

//Creating the forgotpassword function
export const forgotpassword = async (req, res) => {
  //Extract email from req.body
  const {email} = req.body
  try{
  //Trying to find the email that the user put in to register to see if it already exists in the database
  const user = await userModel.findOne({email: email})

  
  //Create a reset Token
  const resetToken = jwt.sign({ email: user.email }, JWT, { expiresIn: "1h" });
  
  //if the email does not exist give this message to the user
  if(!user) {
    return res.status(400).json({message: "Sorry the user cannot be found"})
  }

  //Creating the url for reset
  const resetURL = `http://localhost:3000/student/resetPassword/${resetToken}`

  //Creating Email Subject
  const emailsubject = "Forgot your Password. No problem. Reset it."

  //Creating the email body
  const emailhtml = `
    <h1>Please Reset your Password</h1>
    <p>You requested a password reset. To reset your password, please click the link below:</p>
    <a href=${resetURL} style="padding: 10px 15px; background-color: #FFBB00;">Reset Password</a>
    <p>If you did not request this change, please ignore this email.</p>`

  //using the sendEmail to send the mail
  await sendEmail (user.email, emailsubject, emailhtml)

  //show this message if the email is sent successfully
  return res.status(200).json({ message: "The email to reset Password has been sent"});
  } catch (error) {
    console.log(error)
    //If the user cannot be send the email show this message
    return res.status(400).json({ message: "Server Error. Can not send the email. Please try again later."});
  }
}

export const resetPassword = async(req, res) => {
  //Extract resetToken and password from req.body
  const {resetToken, password} = req.body 

  try {
    // if token exist compare the jwttoken received above with the token in the .env file to see if it verifies and then decode it 
    const decoded = jwt.verify(resetToken, JWT);

    //Trying to find the email that the user put in to register to see if it already exists in the database
    const user = await userModel.findOne({email: decoded.email})

    //if the email does not exist give this message to the user
    if(!user) {
      return res.status(400).json({message: "Sorry the user cannot be found"})
    }

    //Hash the new password that the user provided before storing it in database for security
    const hashpassword = await bcrypt.hash(password, 15);
    //updating the password with the new hashed password
    user.password = hashpassword;

    //saving the new password in database 
    await user.save();
    //show this message if the password is successfully updated
    return res.status(200).json({ message: "The password has been successfully updated" });
  } catch (error) {
      //If the user cannot be update the password show this message
      return res.status(400).json({ message: "Server Error. Can not update the password. Please try again later."});
    }
}