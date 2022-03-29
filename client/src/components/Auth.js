import {useState ,useEffect} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = ({setShowModal, isSignUp}) => {

    const toastOptions = {
        position: "bottom-left",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

     /*  useEffect(() => {

        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate('/dashboard')
        }
      },); */

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [number, setNumber] = useState(null)
    const [avatarURL, setAvatarURL] = useState(null)
    const [error, setError] = useState(null)

    console.log(email, password, confirmPassword, number, avatarURL, error)

    const navigate = useNavigate();

    const handleclick = () => {
        setShowModal(false)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

   
        try {

            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords not match')
                return
            }
            console.log('posting', username, email, password, number, avatarURL)

            const URL = 'http://localhost:8000/users';
           

              const response = await axios.post(`${URL}/${isSignUp ? 'register' : 'Login'}`, {
                username,
                email,
                password,
                number,
                avatarURL

            }).catch(err => console.log('the error response : '+err.response.data.message))
            
        

           
           
            // some code..
            console.log('posting111', username, email, password, number, avatarURL)

          
 

            const success = response.status === 200
            console.log(response.status)
            
           
            
           
            if (success === false) {
                toast.error(response.msg, toastOptions);
                console.log(response.msg)
              }
            if(success ){
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(response.data)
                  );
               
                 navigate('/dashboard')
    
            }
           

        } catch (error) {
            console.log(error)
        }

    
    }

    return (
        
        <div className="auth-modal">
            <div className="close-icon" onClick={handleclick}>X</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p> Our Privacy Policy</p>
            <form onSubmit={handleSubmit}>

                {isSignUp &&

                    <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="User Name"
                        onChange={(event => setUsername(event.target.value))}
                        required={true}
                    />}
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    onChange={(event => setEmail(event.target.value))}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    onChange={(event => setPassword(event.target.value))}
                />
                {isSignUp && <input
                    type="password"
                    id="confirmpassword"
                    name="confirm password"
                    placeholder="Confirm Password"
                    required={true}
                    onChange={(event => setConfirmPassword(event.target.value))}
                />}


                {isSignUp &&

                    <input
                        type="phoneNumber"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        onChange={(event => setNumber(event.target.value))}
                        required={true}
                    />}

                {isSignUp &&

                    <input
                        name="avatarURL"
                        id="avatarURL"
                        type="avatarURL"
                        placeholder="Avatar URL"
                        onChange={(event => setAvatarURL(event.target.value))}
                        required
                    />

                }


                <input className="secondary-button" type="submit"/>
                <p>{error}</p>


            </form>
            Auth Modal
        </div>

    )
}

export default Auth
