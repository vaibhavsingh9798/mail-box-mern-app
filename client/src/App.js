
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import MailEditor from './components/Mail/MailEditor';

function App() {
  return (
    <div >
      <h1>ONS</h1>
      {/* <Signup /> */}
       <Login/> 
      <MailEditor />
    </div>
  );
}

export default App;
