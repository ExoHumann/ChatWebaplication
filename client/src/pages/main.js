const socket = io()

var form = document.getElementById('form');
var input = document.getElementById('input');
var roomName = document.getElementById("room-name");
var userList = document.getElementById("users");

//Få username og Room fra URL
let currentURL = window.location.search
let url = new URLSearchParams(currentURL)
const username = url.get("username")
const room = url.get("room")
socket.emit("userInfo", {username, room})
 

form.addEventListener('submit', function(e) { 
  e.preventDefault();
  if (input.value) { 
    socket.emit('chat message fra frontend', (input.value)); 
    input.value = '';
  }
});

socket.on('chat message fra backend', function(msg) { 
  console.log(msg)

  var item = document.createElement('li');
  
  item.classList.add("message")
  item.innerHTML = `<p class="meta">${msg.username} <span>${msg.date}</span>, <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>`
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);

});

//Få room og alle dets brugere deri.
socket.on("roomUsers", ({ room, users}) => {
  outputRoomName(room),
  outputUsers(users)
})

function outputRoomName(room){
  roomName.innerText = room
}
function outputUsers(users){
  userList.innerHTML = `
  ${users.map(user=> `<li>${user.username}</li>`).join()}`
}

socket.on("message", message => {
  console.log(message)
})
