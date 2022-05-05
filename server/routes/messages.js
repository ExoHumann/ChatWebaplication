const express = require('express')
const router = express.Router()
const Messages = require("../models/message");


router.post('/getmsg' , async (req, res) =>  {
    try {
      const { from, to, createdAt } = req.body;
      
  
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });



      
  
      const projectedMessages = messages.map((msg) => {

        console.log(msg.createdAt);
       // messagedate:msg.messagedate,
        
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          messagedate :msg.message.messagedate,
          username :msg.message.username
          

         
          
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      
    }
  })


  router.post('/addmsg' , async (req, res) => {
    try {
      const { from, to, message, time, username } = req.body;
      //createdtime :msg.createdAt,
      // messagedate :time
      const data = await Messages.create({
        message: { text: message, messagedate: time ,username: username },
        users: [from, to],
        sender: from,
       
        

        
        
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      
    }
  })


  router.post('/deletemessage/:id' , async (req, res) => {
    
    try {
      await res.message.remove()
      res.status(204).json({message: 'message deleted'})
  } catch (error) {
      res.status(500).json({message: error.message})
  }
  })
  


module.exports = router;