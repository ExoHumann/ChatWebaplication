import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import {BrowserRouter, Routes,Route, useNavigate} from 'react-router-dom'
import Footer from './pages/Footer';
import Chat from './pages/Chat';
import Setavatar from './components1/SetAvatar'
import Group from './pages/group';






const App = () => {
  

  return (
      <BrowserRouter>
      <footer></footer>
     
        <Routes>
          <Route path={'/'} element ={<Home/>}/>
          <Route path={"/dashboard"} element ={<Dashboard/>}/>
          <Route path={"/onboarding"} element ={<Onboarding/>}/>
          <Route path={'/chat'} element ={<Chat/>}/>
          <Route path={'/setAvatar'} element ={<Setavatar/>}/>
          <Route path={'/group'} element ={<Group/>}/>
          

        </Routes>
       
       
      </BrowserRouter>
  );
}

export default App;
