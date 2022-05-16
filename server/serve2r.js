const PORT = 8000
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const socket = require("socket.io");

const app = express()


app.use(cors())



app.use(express.json())
app.use(express.urlencoded({extended: true}))



// MIDDLEWARE
//app.use('/users', () => console.log('middelware'))


// ROUTES
const usersRouter = require('./routes/users')
const Messages = require('./routes/messages')
const Chat = require('./routes/chat')

app.use('/users', usersRouter)
app.use('/messages', Messages)
app.use('/chat', Chat)





// CONNECTION TO DATABASE
const promes = mongoose
.connect(process.env.DATABASE_URL,{
    dbName:"app1",
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family: 4,

})

promes.then(() => 
  console.log('mongoDB connected...'))

promes.catch((err) => 
  console.log(err))







// Start listening

const server = app.listen(PORT, () => console.log('Server has started ' + PORT))

// Start socket

const io = socket(server, {

    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  })
  
  global.onlineUsers = new Map();
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    global.chatSocket = socket;
    
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
    
  });