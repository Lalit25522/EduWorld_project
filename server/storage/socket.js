//importing Server from the socket.io
import {Server} from "socket.io"

//declaring a object to store socketIds of the sender and receiver
const userinfostore = {};
//creating a variable to store socket server info
let io;

//creating the function to get socketId of teh reciver
export const messagereceiversocketId = (receiverId) => {
  console.log("Receiver Socket " + userinfostore[receiverId])
  return userinfostore[receiverId]
}

// setting up the socket server
export const socket = (server) => {
  io = new Server(server, {
    cors: {
      //url of the front end 
      origin: 'http://localhost:3000',
      //only allow Get and Post methods 
      methods: ['GET', 'POST'],
    },
  });
 
  //creating a socket connection when the user is connected
  io.on("connection", (socket) => {
    console.log("New Connection is established" + socket.id)

    //using this in order to get the profile Id from the front end 
    const profileId = socket.handshake.query.profileId;

    //checking if the profileId from frontend is not undefined
    if(profileId !== "undefined") {
      console.log("The user of the connected user is " + profileId)
      //associate the socketId with the profile Id in userinfostore
      userinfostore[profileId] = socket.id;
      console.log("The socket Id for the user is" + socket.id)
    } 

    //emit a list of the online user 
    io.emit("getOnlineUsers", Object.keys(userinfostore));

    //creating a socket disconnect when the user disconnects from the server
    socket.on("disconnect", () => {
      console.log("The user has been disconnected: ", socket.id)
      //removing the profileId form the userinfostore to remove the user form the list of online user
      delete userinfostore[profileId]
      //emit the new list of the users who are online 
      io.emit("getOnlineUsers", Object.keys(userinfostore));
    });
  });
  return io;
}

export{io};