import React from 'react'
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";



const Logout = () => {

  const navigate = useNavigate();
  const handleClick = async () => {
    const URL = 'http://localhost:8000/users/logout';
  
      localStorage.clear();
      window.location.href = '/';
  
    
     /*    const id = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;

        const data = await axios.get(`${URL}`)
        .catch(err => console.log('the error response : '+err.response.data.message))

        if (data.status === 200) {
          localStorage.clear();
          navigate("/");
        } */
    
    }


  return (
    <div className='LogoutButton' onClick={handleClick}>
      Log Out
      <BiPowerOff className='svg' />
    </div>
  )
}




export default Logout