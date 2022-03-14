import React, {useState} from 'react'
import Nav from '../components/Nav'
import Auth from "../components/Auth";
const Home= () => {


  const [ShowModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true)


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
        {authToken ? 'SignOut' : 'Creat Account'}
    </button>

      {ShowModal && (<Auth setShowModal={setShowModal}  setIsSignUp={setIsSignUp} isSignUp={isSignUp}/>)}

    </div>

    </div>
  )
}

export default Home