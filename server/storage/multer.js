//importing the multer library
import multer from "multer";
//importing the multer storage cloudinary library
import {CloudinaryStorage} from "multer-storage-cloudinary"
//importing the cloudinary library
import { v2 as cloudinary } from 'cloudinary';
//importing to get credentials from .env file
import {} from "dotenv/config";

   // Configuration of the cloudinary 
    cloudinary.config({ 
      // cloud name
      cloud_name: process.env.cloudName, 
      //api key
      api_key: process.env.cloudKey, 
      //api secret
      api_secret: process.env.cloudSecret 
    });

//Creating a new CloudinaryStorage using cloudinary
//Reference: https://www.npmjs.com/package/multer-storage-cloudinary
const pictureStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    //Giving it the params such as folder name in the cloudinary and file types
    params:{ folder: 'profilephoto',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    },
  });

//Using the multer to store the image in the cloudinary storage
export const multerpic = multer({storage: pictureStorage});
