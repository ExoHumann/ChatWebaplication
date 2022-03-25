import React from 'react'

const  ChatHeaer =() => {
  return (
    <div className='chat-container-header'>
        <div className='profile'>
            <div className='img-container'>
                <img src='../assert/chat.jpg'/>
            </div>

            <h3> UserName</h3>

        </div>
        <i className='log-out-icon'> Logout</i>
        
        
        
    </div>
  )
}

export default ChatHeaer