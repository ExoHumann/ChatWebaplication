import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import grupes from "./grupes"
import SetAvatar from "./SetAvatar";

 function Contacts({ contacts, changeChat }) {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
 // console.log(`Contacts: ${JSON.stringify(contacts)}`);



  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  

  


  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.userId.username);
   
    setCurrentUserImage(data.userId.avatarURL);
    

  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (


        <div className="contacts-container">
          <div className="brand">
              <button className="createGrupes" onClick={ <grupes/>}> create groupe</button>
           
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              {console.log("contacts name ssssss" + contact._id)}
              


              return (
                <div
                  key={contact._id}
                  
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}

                  
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img className="avatarimg"
                      src={`data:image/svg+xml;base64,${contact.avatarURL}`}
                      alt=""
                    />
                  </div>
                  <div className="contact-username">
                    <h3>{contact.username }</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="current-user-avatar">
              <img className="current-user-img"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                onClick={() =>
                   navigate("/setAvatar") 
                   }
              />

            </div>
            <div className="current-user-username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default  Contacts

