//importing the mongoose model
import mongoose from 'mongoose';

//creating the mongoose schema for the chat
const ChatSchema = new mongoose.Schema ({
    //Creating a field called Chatpartcipants that will take the ObjectId from the profile model to associate to the sender and receiver profiles of the message
    Chatpartcipants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    }],
    //Creating a field called ChatlastText that will take an array of the last message from the Message model
    ChatlastText: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
    //creating a timestamp
    Timestamp: { type: Date, default: Date.now },
}
);

//Creating a mongoose model
const Chat = mongoose.model("Chat", ChatSchema);

//Exporting the model for use
export default Chat;