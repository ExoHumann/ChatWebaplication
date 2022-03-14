import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
const image1 ="https://as2.ftcdn.net/v2/jpg/04/52/33/63/1000_F_452336337_6kbc4MRiSohHcfRsuKcZvitu7Uw2ZrW6.jpg"
const image2 ="https://as2.ftcdn.net/v2/jpg/04/52/33/63/1000_F_452336337_6kbc4MRiSohHcfRsuKcZvitu7Uw2ZrW6.jpg"

const Nav = ({ninimal,authToken, setShowModal,showModal, setIsSignUp}) => {

    const handleClick =() => {
        setShowModal(true)
        setIsSignUp(false)
    }

  return (

     <nav>
         <div className="logo-container">
             <img className="logo" src={ninimal ?image1 :image2 }/>

         </div>
         {!authToken && !ninimal && <button className="nav-button"
         onClick={handleClick}
         disabled={showModal}
         >Log in </button>}


     </nav>

  )
}

export default Nav