
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import LoginPage from './Components/LoginPage';
import PatientLogin from './Components/PatientLogin';
import DoctorLogin from './Components/DoctorLogin';
import DoctorRegister from './Components/DoctorRegister';
import PatientRegister from './Components/PatientRegister';
import PatientPage from './Components/PatientPage';
import DoctorPage from './Components/DoctorPage';
import HistoryPatient from './Components/HistoryPatient';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path='/'/>
          <Route Component={LoginPage} path='/LoginPage'/>
          <Route Component={PatientLogin} path='/PatientLogin'/>
          <Route Component={DoctorLogin} path='/DoctorLogin'/>
          <Route Component={DoctorRegister} path='/DoctorRegister'/>
          <Route Component={PatientRegister} path='/PatientRegister'/>
          <Route Component={DoctorPage} path='/DoctorPage'/>
          <Route Component={PatientPage} path='/PatientPage'/>
          <Route Component={HistoryPatient} path='/HistoryPatient'/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
