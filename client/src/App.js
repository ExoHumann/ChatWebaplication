

import Home from './pages/Home';
import {BrowserRouter, Routes,Route, useNavigate} from 'react-router-dom'
import Footer from './pages/Footer';
import Chat from './pages/Chat';
import Setavatar from './components1/SetAvatar'


const App = () => {
  

  return (
      <BrowserRouter>
      <footer/>
     
        <Routes>
          <Route path={'/'} element ={<Home/>}/>
          <Route path={'/chat'} element ={<Chat/>}/>
          <Route path={'/setAvatar'} element ={<Setavatar/>}/>
          
        </Routes>
       
       
      </BrowserRouter>
  );
}

export default App;
