import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    ).userId._id;


    const data = await axios.get(`${logoutRoute}/${id}`);
    
    if (data.status === 200) {
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div className="logoutbutton" onClick={handleClick}>
      <BiPowerOff />
    </div>
  );
}


export default Logout