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
            console.log("BrowserData" + BrowserData)
            console.log('Hiiiiiiiiiiiiiii')
          navigate("/chat");
          
        }
      }, []);

    const handleclick = () => {
        setShowModal(false)

    }

    // 1
/* const indexedDB =
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;

if (!indexedDB) {
console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("CarsDatabase", 1);



request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };
  request.onupgradeneeded = function () {
    //1
    const db = request.result;
  
    //2
    const store = db.createObjectStore("cars", { keyPath: "id" });
  
    //3
    store.createIndex("cars_colour", ["colour"], { unique: false });
  
    // 4
    store.createIndex("colour_and_make", ["colour", "make"], {
      unique: false,
    }); 
  }; */

  /* 
    request.onsuccess = function () {
        
        console.log("Database opened successfully");
      
        const db = request.result;
      
        // 1
        const transaction = db.transaction("cars", "readwrite");
        //var transaction = db.transaction(["books"], 'readwrite');
      
        //2
        const store = transaction.objectStore("cars");
        const colourIndex = store.index("cars_colour");
        const makeModelIndex = store.index("colour_and_make");
      



        //3
        store.put({ id: 1, colour: "Red", make: "Toyota" });
        store.put({ id: 2, colour: "Red", make: "Kia" });
        store.put({ id: 3, colour: "Blue", make: "Honda" });
        store.put({ id: 4, colour: "Silver", make: "Subaru" });
      
        //4
        const idQuery = store.get(4);
        const colourQuery = colourIndex.getAll(["Red"]);
        const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);
      
        // 5
        idQuery.onsuccess = function () {
          console.log('idQuery', idQuery.result);
        };
        colourQuery.onsuccess = function () {
          console.log('colourQuery', colourQuery.result);
        };
        colourMakeQuery.onsuccess = function () {
          console.log('colourMakeQuery', colourMakeQuery.result);
        };
      
        // 6
        transaction.oncomplete = function () {
          db.close();
        };
      }; */

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

            }).catch(err =>  console.log('the error response : '+err.response.data.message)  +setError(err.response.data.message),)
            
           

            // some code..
            console.log('posting111', username, email, password, number, avatarURL)
            const success = response.status === 200
            console.log(response.status)
            
            if (success === false) {
                
                console.log(response.msg)
              }
            if(success == true ){

              
 

               // setBrowserData(response.data)
               // console.log("BrowserData" + BrowserData)

               /*   localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(response.data)
                    
                  )  */
                  console.log(response.data.userId)

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
