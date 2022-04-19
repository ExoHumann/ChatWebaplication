import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

import { sendMessageRoute, recieveMessageRoute, deleteAccountRoute, logoutRoute } from "../utils/APIRoutes";

function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
   
    
    const response = await axios.post(recieveMessageRoute, {
      from: data.userId._id,
      to: currentChat._id,
      

    });
    setMessages(response.data);

    

  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).userId._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data.userId._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data.userId._id,
      to: currentChat._id,
      message: msg,
    });
    console.log( currentChat._id)
    
    const msgs = [...messages]; 
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
 
  
  const navigate = useNavigate();

  
  

 
  

  const handledeleteAcc = async () => { 

   
    
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );


    var proceed = window.confirm("!!! WARNING !!! WARNING !!! WARNING !!!\nAre you shure you want to delete your account forever?");
if (proceed) {
  
  const response1 = await axios.get(`${logoutRoute}/${data.userId._id}`);

  const response = await axios.delete(`${deleteAccountRoute}/${data.userId._id}`)

  console.log(response.data);

  
  
if (response1.status === 200) {
localStorage.clear();
navigate("/");
}
} else {
 
  navigate("/chat");
}
       

  }
  

  return (
    <div className="chatcontainer">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img className="avatarimage"
              src={`data:image/svg+xml;base64,${currentChat.avatarURL}`}
             // src={"https://images.app.goo.gl/fyLFw8vZR3h3A6V8A"}
              alt=""
              //"https://images.app.goo.gl/fyLFw8vZR3h3A6V8A"
              
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />


        <button onClick={handledeleteAcc} type="button" class="btn btn-danger">Delete your Account</button>



      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div className="thum" ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default  ChatContainer
