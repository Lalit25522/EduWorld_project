//importing nodemailer
import nodemailer from "nodemailer";
//importing to get credentials from .env file
import {} from "dotenv/config";

const mailtransport = () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: "gmail", 
        secure: true,
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    })
}

export const sendEmail = async (emailreceiver, emailsubject, emailhtml) => {

    const emailtransport = mailtransport();

    const mailOptions = {
        from: process.env.Email,
        to: emailreceiver,
        subject: emailsubject,
        html: emailhtml
    }

    try{
        await emailtransport.sendMail(mailOptions);
        console.log("The email has been sent successfully")
    } catch (error) {
        console.log(error)
      //If the user cannot be registered show this message
      console.log("Error Occurred. Cannot send the Email")
    }
}