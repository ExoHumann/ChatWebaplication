import React, { useEffect, useState, useRef } from "react";

import io from 'socket.io-client'


function Dashboard() {
  


 
  return (

    

<html>


  <head>
    <title>Socket.IO chat</title>

  </head>
  <body>

  <div class="room-control">
						<label for="room">Room</label>
						<select name="room" id="room">
							<option value="Room 1">Room 1</option>
							<option value="Room 2">Room 2</option>
							<option value="Room 3">Room 3</option>
							<option value="Room 4">Room 4</option>
							<option value="Room 5">Room 5</option>
							<option value="Room 6">Room 6</option>
						</select>
					</div>

      <main class="chatdashboradd">
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




