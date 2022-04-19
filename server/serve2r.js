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

app.use('/users', usersRouter)
app.use('/messages', Messages)




// CONNECTION TO DATABASE
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family: 4,

})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))





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