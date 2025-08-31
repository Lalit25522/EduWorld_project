// import the message model
import messageModel from "../models/Message.js"
//import the chat model
import chatModel from "../models/Chat.js"
// import the profile model
import profileModel from "../models/Profile.js"
//import the messagereceiversocketId and io from the socket file
import {messagereceiversocketId, io} from "../storage/socket.js"


export const startnewChat = async(req, res) => {
    const {receiverId} = req.body;
    //Set the userId which will take the req.userId parameter
    //req.userId will get the userId from the decoded jwt token
    const senderId = req.userId;
    try{
        //Finding the sender profile with the userId from the req.userId
        const senderProfile = await profileModel.findOne({
            user: senderId
        })
        
        //Getting the sender profile Id 
        const senderProfileId = senderProfile._id

        //Finding the chat using the chatparticipant and $all is used to find both senderProfileId, receiverId in Chatpartcipants
        let chat = await chatModel.findOne({
            Chatpartcipants: { $all: [senderProfileId, receiverId] },
        });

        //If chat does not exist create new chat to Mongodb
        if(!chat) {
            chat = await new chatModel({
                //add both senderProfileId and receiverId to Chatpartcipants
                Chatpartcipants: [senderProfileId, receiverId],
            })
            //save the chat to the mongodb
            chat.save();
        }

        // pass the chat information to the client 
        res.json(chat);
    }catch (error){
        //Show this error to the user if the new chat cannot be created
        return res.status(400).json({message: "Server Error. Cannot create new chat. Please try again later"})
    }
}


//creating the senduserMessage function
export const senduserMessage = async(req, res) => {
    //Extract the MessageContent from the req.body
    const { receiverId, MessageContent} = req.body;
    //Set the userId which will take the req.userId parameter
    //req.userId will get the userId from the decoded jwt token
    const senderId = req.userId;

    try {

        //Finding the sender profile with the userId from the req.userId
        const senderProfile = await profileModel.findOne({
            user: senderId
        })
        
        //Getting the sender profile Id 
        const senderProfileId = senderProfile._id

        //Finding the chat using the chatparticipant and $all is used to find both senderProfileId, receiverId in Chatpartcipants
        let chat = await chatModel.findOne({
            Chatpartcipants: { $all: [senderProfileId, receiverId] },
        });

        //Creating a new instance newSendMessage and passing the senderProfileId, receiverId and MessageContent 
        const newSendMessage = new messageModel ({
            Messagesender: senderProfileId,
            Messagereceiver: receiverId,
            MessageContent: MessageContent
        })

        //Saving the newSendMessage instance to the database
        newSendMessage.save()

        //Add the newSendMessageId at the end of the array
        chat.ChatlastText.push(newSendMessage._id);

        //saving the chat again with the newSendMessageId
        chat.save()

        //using the socket to send the message to the reciever of the message
        const MessagereceiverId = messagereceiversocketId(receiverId); 
        console.log("Trying to find socket for receiver: " + receiverId);
        console.log("The receiver socket is " + MessagereceiverId)
        if(MessagereceiverId) {
            io.to(MessagereceiverId).emit("newsendMessage", newSendMessage);
        } 
        
        // pass the newsendMessage to the client 
        res.json(newSendMessage)
    } catch (error){
        //Show this error to the user if the new message cannot be created
        return res.status(400).json({ message: "Server error. Cannot create new message. Please try again later."});
    }
}

//Creating the retrieveChat function
export const retrieveChat = async(req, res) => {
    //Set the userId which will take the req.userId parameter
    //req.userId will get the userId from the decoded jwt token
    const senderId = req.userId;

    try{
        //Finding the sender profile with the userId from the req.userId
        const senderProfile = await profileModel.findOne({
            user: senderId
        })

        //Getting the sender profile Id 
        const senderProfileId = senderProfile._id

        //Finding all the chats that includes the senderprofileId
        const chat= await chatModel.find({
            Chatpartcipants : senderProfileId,
        }).populate("Chatpartcipants", "firstName").populate("ChatlastText");

        // pass the chat information to the client 
        res.json(chat)
    } catch (error) {
        console.log(error);
        //Show this error to the user if the chat cannot be retrieved
        return res.status(400).json({message: "Server Error. Chat can not be retrieved"})
    }
}

//Creating the retrieveMessageinChat function
export const retrieveMessageinChat = async(req, res) => {
    //Getting the chatId using the req.params
    const{chatId} = req.params;

    try {
        //Finding all the messages that are included in a chat using the chatId
        const chat= await chatModel.findById(chatId).populate("Chatpartcipants", "firstName"). populate("ChatlastText");

        //if a chat does not include any messages show this error
        if(!chat) {
            return res.status(404).json({message: "There are no messages to show"})
        }

        //passing the chatlasttext to the client
        res.json(chat.ChatlastText)
    } catch (error){
        console.log(error);
        //Show this error to the user if the message cannot be retrieved
        return res.status(400).json({message: "Server Error. Messages can not be retrieved"})
    }
}