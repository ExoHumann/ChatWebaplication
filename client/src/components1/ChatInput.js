import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

import { io } from "socket.io-client";

 function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };


  const filehandle = ()=>{
    const socket = io();
    
    document.getElementById("img-submit").onclick = function () {
        const ourFile = document.getElementById('img-uplaod').files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
             socket.emit("send-img", reader.result);
        }
        reader.readAsDataURL(ourFile);
    };
  }


  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

 

  return (
    <div className="chatinput-container">
      <div className="button-container">

      <div  className="emoji">
      
        </div>


        <div className="emoji">
          <BsEmojiSmileFill className="emojisvg" onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>

  

      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input className="chatinput"
          type="text"
          placeholder="Type your message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="send-button" type="submit">
          <IoMdSend  className="send-button-svg"/>
        </button>
      </form>
    </div>
  );
}

export default  ChatInput

