import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components1/ChatContainer";
import Contacts from "../components1/Contacts";
import Welcome from "../components1/Welcome";

 function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);

  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
     

      socket.current = io(host);
      socket.current.emit("add-user", currentUser.userId._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.userId.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser.userId._id}`)

        
        setContacts(data.data)
      

       
      }  else {

        navigate("/setAvatar");
      } 
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="chat-container">
        <div className="containerforchat">
          <Contacts contacts={contacts} changeChat={handleChatChange}  />
        
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}

          
        </div>
        
      </div>
    </>
  );
}

export default Chat