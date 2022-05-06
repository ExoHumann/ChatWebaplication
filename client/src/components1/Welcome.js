import React, { useState, useEffect } from "react";

const Welcome = () => {

  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName( await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).userId.username
    );
  }, []);

  return (
    <div className="welcomeContainer">
      <img className="welcomeimage" src="https://media1.giphy.com/media/dZXzmKGKNiJtDxuwGg/giphy.gif?cid=ecf05e470vkp0tvpxurx9uyf7io9eo7bf29x9ryb5t31do53&rid=giphy.gif&ct=g" alt="" />
      <h1>
        Welcome to this chat, <span className="welcomeuserName">{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}

export default Welcome

