
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import MailBox from './components/Mail/MailBox';
import MailEditor from './components/Mail/MailEditor';
import Home from './components/Home/Home';
import HomeNavbar from './components/Home/HomeNavbar';

function App() {
  return (
    <div >
     <HomeNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mail-box' element={<MailBox />} />
        <Route path='/mail-editor' element={<MailEditor />} />
      </Routes>
    </div>
  );
}

export default App;
