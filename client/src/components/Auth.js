import {useState ,useEffect} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';


const Auth = ({setShowModal, isSignUp}) => {

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [number, setNumber] = useState(null)
    const [avatarURL, setAvatarURL] = useState(null)
    const [error, setError] = useState(null)
    const [BrowserData, setBrowserData] = useState([]);
    
    

    console.log(email, password, confirmPassword, number, avatarURL, error)

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/chat");
          
        }
      }, []);

    const handleclick = () => {
        setShowModal(false)

    }

   

    const handleSubmit = async (e) => {
        e.preventDefault()


       
   
        try {

          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

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
                avatarURL}
                ,config)
                .catch(err =>  console.log('the error response : '+err.response.data.message)  +setError(err.response.data.message),)
            
           

            // some code..
          
            const success = response.status === 200
            
            if (success === false) {
                
                console.log(response.msg)
              }
            if(success == true ){

                  localStorage.setItem(
                    //response.data.username,
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(response.data )
                    
                  ) 


                  navigate('/chat')
               
                
    
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

                
                <div className='error'>
                <p >{error}</p>
                </div>
               


            </form>
            Auth Modal
        </div>

    )
}

export default Auth
