import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import LoginPage from './Components/LoginPage';
import Donor from './Components/Dlogin';
import DonorRegister from './Components/DonorRegister';
import DonorPage from './Components/DonorPage';
import VolunterLogin from './Components/VolunterLogin';
import VolunterPage from './Components/VolunterPage';
import VolunterRegister from './Components/VolunterRegister';
import RecipientLogin from './Components/RecipientLogin';
import RecipientPage from './Components/RecipientPage';
import RecipientRegister from './Components/RecipientRegister';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path='/'/>
          <Route Component={Donor} path='/Dlogin'/>
          <Route Component={DonorRegister} path='/DonorRegister'/>
          <Route Component={DonorPage} path='/DonorPage'/>
          <Route Component={VolunterRegister} path='/VolunterRegister'/>
          <Route Component={VolunterLogin} path='/VolunterLogin'/>
          <Route Component={VolunterPage} path='/volunter'/>
          <Route Component={RecipientRegister} path='/RecipientRegister'/>
          <Route Component={RecipientLogin} path='/RecipientLogin'/>
          <Route Component={RecipientPage} path='/Recipient'/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
