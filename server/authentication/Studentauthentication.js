//importing the libraries that are going to be used in the file
import jwt from "jsonwebtoken"
import {} from "dotenv/config";

// creating a export function named authenticated
export const authenticated = async(req, res, next) => {
  
// Extracting the token from the request header
    const jwttoken = req.headers.authorization?.split(' ')[1];

// if the token does not exist give this error message
  if (!jwttoken) {
    return res.status(401).json({ message: "The user is not authorised" })
  };

  try {
    // if token exist compare the jwttoken received above with the token in the .env file to see if it verifies and then decode it 
    const decoded = jwt.verify(jwttoken, process.env.JWT_Token);
    // Once decoded attach the userid from token to the request object.
    req.userId = decoded.userId
    //pass control to the next middleware or route handler 
    next();
  } catch (error) {
    //if the token doesn't match the one in the .env file give this error
    res.status(401).json({ message: "The token is not valid or expired" });
  }
}