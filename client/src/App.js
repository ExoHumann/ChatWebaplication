
import './App.css';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Footer from './pages/Footer';





const App = () => {

  return (
      <BrowserRouter>
     
        <Routes>
          <Route path={'/'} element ={<Home/>}/>
          <Route path={"/dashboard"} element ={<Dashboard/>}/>
          <Route path={"/onboarding"} element ={<Onboarding/>}/>
          <Route path={'/dashboard'} element ={<Home/>}/>

        </Routes>
        <Footer/>
       
      </BrowserRouter>
  );
}

export default App;
