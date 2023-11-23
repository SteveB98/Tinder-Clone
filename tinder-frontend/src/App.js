//import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import './App.css';
import './index.css';
import { useCookies } from 'react-cookie';
//STARTUP NOTES: MUST enable Node.js via 'nodemon server.js' in separate terminal (tinder-backend) for backend. Then do 'npm start' in /tinder-clone for front end of app

function App() {
  const [cookies, setCookie,removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken
  return (
    // BEM Class Naming Convention
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
          {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
          {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
      </Routes>
    </BrowserRouter>
  );
}
export default App;

