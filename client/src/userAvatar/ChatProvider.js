import React, { createContext, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const ChatContext = createContext();



const ChatProvider = ({ children }) => {

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("chat-app-current-user"));
    setUser(userInfo.userId);
    console.log(userInfo);

    if (!userInfo) Navigate.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Navigate]);

  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const Navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("chat-app-current-user"));
    setUser(userInfo);
    console.log(userInfo);

    if (!userInfo) Navigate.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
