import React, {useState ,useEffect} from 'react'
import Nav from '../components/Nav'
import Auth from "../components/Auth";
import {useNavigate} from 'react-router-dom';
const Home= () => {
  const navigate = useNavigate();


  const [ShowModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true)

/*   useEffect(() => {
          
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/dashboard')
    }
  },); */

const authToken =false
const  handleClick =() =>{
    console.log('cliched')
  setShowModal(true)
  setIsSignUp(true)
}
  return (

    <div className="overlay">
    <Nav minimal ={false}
         authToken ={authToken}
         setShowModal={setShowModal}
         showModal={ShowModal}
         setIsSignUp={setIsSignUp}
    />

    <div className='home'> 
    <h1 className="title"> Chat app</h1>

    <button className='primary-button' onClick={handleClick}>
        {authToken ? 'SignOut' : 'Create Account'}
    </button>

      {ShowModal && (<Auth setShowModal={setShowModal}  setIsSignUp={setIsSignUp} isSignUp={isSignUp}/>)}

    </div>

    </div>
  )
}

export default Home