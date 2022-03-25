
import ChatHeaer from './ChatHeaer'
import ChatDisplay from './ChatDisplay'
import Logout from './Logout'

import React, { useState, useEffect, useRef } from "react";



//const navigate = useNavigate();


const ChatContainer =() => {



/*

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);
*/

  

  return (
     <div className='ChatContainer'>
    
     
      <Logout />
    </div>

   
  
  )
}

export default ChatContainer

