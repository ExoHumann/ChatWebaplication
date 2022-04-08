import React, { useEffect, useState, useRef } from "react";
import ChatContainer from '../messages/ChatContainer'





function Dashboard() {
  
  
  /* useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []); */

 
 
  return (


<html>
  <head>
    <title>Socket.IO chat</title>

  </head>
  <body>
      <main class="chatdashborad">
    <div class="chat-sidebar">
        <h3><i class="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">Room</h2>
        <h3><i class="fas fa-users"></i> Users</h3>
        <ul id="users">
        </ul>
      </div>
    <div class="chat-messages">
      <div class="message">
        <p class="meta">Socket.io robot</p>
        <p class="text">
          Velkommen til dette Room. 
        </p>
      </div>
  </div>
</main>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
<script src="/socket.io/socket.io.js"></script>
<script src="/main.js" type = "text/javascript"></script>

  </body>
</html>

    
  )
}

export default Dashboard




