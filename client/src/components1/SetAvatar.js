import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute,getAvatarsRoute } from "../utils/APIRoutes";
import Avatar from 'avataaars'
import { allUsersRoute } from "../utils/APIRoutes";



 const SetAvatar =() => {

  const api =`https://api.multiavatar.com`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/");
      setIsLoading(false)
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      console.log("from setavatar  " + user.userId._id )

      const { data } = await axios.post(`${setAvatarRoute}/${user.userId._id}`, {
        image: avatars[selectedAvatar],
        
        

      });

      

      if (data.isSet) {
        user.userId.isAvatarImageSet = true;
        //setAvatars(user.userId.avatarURL)
        user.userId.avatarURL = data.image;

        console.log(user.userId.avatarURL)
        console.log("fromfddsfdffdfd" +avatars)

        
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };



 const UpdatePic = async () => { 
  setIsLoading(true) 

    const data = []
   

    for (let i = 0; i < 2; i++) {
    const image = await axios.get(`${api}/${Math.round(Math.random() * 10000)}`)
    const buffer = new Buffer(image.data)
    data.push(buffer.toString("base64"))
    }
    
      setAvatars(data)
      setIsLoading(false)

    
   
  }

  const loadfromlocal = async () => { 

    setIsLoading(true)
     //const data = []

     const  data = await axios.get(getAvatarsRoute)
     console.log(data.data);
    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    setAvatars(data.data.image)
   // console.log(data)
    setIsLoading(false)
  }


  

  
  return (
     
    <>
      {isLoading ? (
        <div className="set-avatar-container">
          <img src="https://c.tenor.com/BtC0jVjzYToAAAAC/loading-chain.gif" alt="loader" className="loader" />
        </div>

      ) : (
        <div className="set-avatar-container">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="set-avatar-avatars">
            {
          
            avatars.map((avatar, index) => {
              return (
                <div
                  className={`set-avatar-avatar ${
                    selectedAvatar === index ? "set-avatar-selected" : ""
                  }`}
                >
                 
                  <img
                   className="set-avatar-avatar-image"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />-
                  
                  
                  
                </div>
              );
            })}
          </div>

            <div className="submit-btn">


            <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>

          <button onClick={loadfromlocal} className="submit-btn">
            load from local
          </button>

          <button onClick={UpdatePic}className="submit-btn" >
            Randomize Avatar
          </button>
            </div >



          <ToastContainer />


        </div>
      )}
    </>
  );
}

export default SetAvatar


