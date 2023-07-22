import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import LoginPage from './Components/LoginPage';
import PatientLogin from './Components/PatientLogin';
import PatientRegister from './Components/PatientRegister';
import Patient from './Components/Patient';
import DoctorLogin from './Components/DoctorLogin';
import DoctorPage from './Components/DoctorPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path='/'/>
          <Route Component={PatientLogin} path='/patientlogin'/>
          <Route Component={PatientRegister} path='/patientregister'/>
          <Route Component={Patient} path='/patient'/>
          <Route Component={DoctorLogin} path='/doctorlogin'/>
          <Route Component={DoctorPage} path='/doctor'/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
