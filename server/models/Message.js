//importing the mongoose model
import mongoose from 'mongoose';

//creating the mongoose schema for the Messages
const MessageSchema = new mongoose.Schema ({
    //Creating a field called Messagesender that will take the ObjectId from the Profile model to associate to the profile of the message sender
    Messagesender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    //Creating a field called Messagereceiver that will take the ObjectId from the Profile model to associate to the profile of the message receiver
    Messagereceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    //Creating a field called MessageContent that will store the message content
    MessageContent:{
        type: String,
        required: true
    },
    //creating a timestamp of the message
    Timestamp: { type: Date, default: Date.now },
}
);

//Creating a mongoose model
const Message = mongoose.model("Message", MessageSchema);

//Exporting the model for use
export default Message; 