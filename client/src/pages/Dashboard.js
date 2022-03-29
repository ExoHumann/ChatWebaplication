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



    



   <div className="chatdashborad">
     <div  className="container">

     
     
     <ChatContainer/>

    
     </div>
     

   </div>



    
  )
}

export default Dashboard




