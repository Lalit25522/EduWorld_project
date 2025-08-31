//importing the react, useState and useEffect from react
import React, { useState, useEffect } from "react";
//importing the socket.io-client
import {io} from "socket.io-client";
//importing the axios library 
import axios from "axios";
//importing link from react-router-dom
import {useParams, useNavigate} from "react-router-dom"
//importing the stylesheet
import "../styling/messaging.css";

//creating messaging function
const Message = () => {
    //Using the Usestate to add the state variables to components
    const [messageHistory, setmessageHistory] = useState([]);
    const [typedmessage, settypedmessage] = useState("");
    const [chat, setChat] = useState([]);
    const [chatId, setChatId] = useState(null);
    const[profileId, setProfileId] = useState(null);
    const {receiverId} = useParams();
    const navigate = useNavigate();

    //getting the studentToken from localstorage
    const studentToken = localStorage.getItem("StudentLoginToken")

    useEffect(()=> {
            //If the token doesn't exist redirect to the login page        
            if(!studentToken) {
                navigate("/student/login")
            }
        }, [navigate])

    useEffect(() => {
        //if the porofileId exist only then send the profileId in the query to backend 
        if(profileId){
            //establishing the socket server at localhost 4000
            const socket = io("http://localhost:4000", {
                query: {profileId: profileId}
            })
            
            //listen for the newsendMessage event. The event will come from server when the new message is sent
            socket.on("newsendMessage", (newMessage) => {
              setmessageHistory((prevMessages) => [...prevMessages, newMessage]);
            });
        
            //removes the connection
            return () => {
              socket.off("newsendMessage");
            };
        }
    }, [profileId]);

    useEffect(()=> {

        //Creating a function to fetch the profile Id of the sender from the server
        const fetchsenderprofileId = async() => {
            try{
                //Getting the profileId of the logged in user by sending the request through the following link to the server side
                const res = await axios.get("http://localhost:4000/studentprofile/profileId", {
                    //getting the generated jwt token from login for authorisation
                    headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
                });
                //updating the profielId state with profile Id from the server
                setProfileId(res.data.profileId)
                console.log("The profile Id is " + res.data.profileId)
            } catch (error){
                //show this error to user in case something goes wrong
                console.log("Server Error")
            }
        }
        fetchsenderprofileId();
    }, [studentToken])

    useEffect(()=> {

        //Creating a function to retrieve all the chats of the user
        const retrieveallchats = async() => {
            //Getting the chats that the logged in user profile is part of by sending the request through the following link to the server side
            const res = await axios.get("http://localhost:4000/message/chat", {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            })
            //updating the Chat state with chat data from the server
            setChat(res.data);
            console.log(res.data);
        };
        retrieveallchats();
    }, []);
 
    useEffect(() => {
        //Creating a function to retrieve the messages that are part of a chat
        const retrieveMessageinChat = async () => {
            //If the chatId exist only then execute the following code
            if (chatId){
                console.log(chatId)
                //Getting the messages in a chat by sending the request through the following link to the server side
                const res = await axios.get(`http://localhost:4000/message/chat/${chatId}`, {
                    //getting the generated jwt token from login for authorisation
                    headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
                });
                console.log(res.data)
                //updating the messagingHistory state with message data from the server
                setmessageHistory(res.data)
            };
            }
            retrieveMessageinChat();
    }, [chatId])

    //Creating a function that will be triggered when the user select a chat
    const handleSelectChat = async(chatId, receiverId) => {
        //set the selected chat Id
        setChatId(chatId);
        //updating the url dynamically with the new reciverId 
        navigate(`/message/${receiverId}`)
    }

    //Creating a function to start a chat
    const handleStartChat = async () => {
        //checking to see if a chat exist by checking the reciverId with one of the id in the chats
        const exisitingChat = chat.find(chat =>
          chat.Chatpartcipants.some(Chatpartcipants => Chatpartcipants._id === receiverId)
        );
    
        //if the chat exist with the reciver then just set the chatId with the id of existing chat
        if (exisitingChat) {
          setChatId(exisitingChat._id);
        } else {
            //if the chat does not exist create a new chat by sending the receiverId to the server through the following url
            const res = await axios.post(
                "http://localhost:4000/message/newChat",
                {receiverId },
                { 
                    //getting the generated jwt token from login for authorisation
                    headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` } 
                }
            );
            //setting the chatId state with the new created chat's id
            setChatId(res.data._id);
            //navigate to the generated chat
            navigate(`/message/${receiverId}`)
        }
      };

    //Creating a function to send a message
    const handleSendingMessages = async () => {
        //if the typed message and chatId exist
        if(typedmessage.trim() && chatId) {
            //sending the message reciver and message to the server with the following url
            const res = await axios.post(`http://localhost:4000/message/sendmessage`, {
                receiverId,
                MessageContent: typedmessage
            }, {
                //getting the generated jwt token from login for authorisation
                headers: { Authorization: `Bearer ${localStorage.getItem("StudentLoginToken")}` }
            });
            //adding the new send message to the message history
            setmessageHistory((previousMessage) => [...previousMessage, res.data])
            //clear the message input field
            settypedmessage("");
        }
    }

    return(
    <div className="messagingcontainer">
        <div className = "chatsidebar">
            <div className="chatsidebarTitle">
                <h2 className = "ChatTitle">All Chats</h2>
            </div>
            <div className="chat-list">
                {chat.map((chat) => {
                    const receiver = chat.Chatpartcipants.find(
                        //eliminating the profileId of the logged in user so in order to get the receiver info
                        (participant) => participant._id !== profileId
                    );
                    return(
                        <div className = "chatitem" key = {chat._id} onClick={() => handleSelectChat(chat._id, receiver._id)} >
                            {
                                //just showing the receiver name in the chat sidebar
                            }
                            <span> {receiver.firstName} </span> 
                        </div>
                    )
                })}
            </div>
            {!receiverId || receiverId !== "undefined" && (
                <div>
                    <button className = "startchatbutton" onClick={handleStartChat}>Start Chat</button>
                </div>
            )}
        </div>
        <div className = "selectedchatWindow">
            {chatId ? (
                <>
                    <div className="Heading">
                        <h2> Chat </h2>
                    </div>
                    <div className="chat-messages">
                    {messageHistory.map((msg) => (
                        //checking if the message sender is the logged in user than the message is sent if not it is received to style the messages accordingly
                        <div key = {msg._id} className={`${msg.Messagesender === profileId ? "messagesent" : "messagereceived"}`}>
                        <p>{msg.MessageContent}</p>
                        </div>
                    ))}
                    </div>
                    <div className="message-input">
                        {
                            //creating a input field for messages
                        }
                    <textarea
                        value={typedmessage}
                        onChange={(e) => settypedmessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendingMessages}>Send</button>
                    </div>
                </>
            ): (
                //if there is no chatId show this
                <div>
                    <h2 className= "chatstartText"> Please select a Chat to Start </h2>
                </div>
            )}
        </div>
    </div>
    )
}

//exporting the message function for use
export default Message;