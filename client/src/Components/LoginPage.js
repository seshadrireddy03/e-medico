import React from 'react';
import '../css/main.css'; 
import Doctor from "../assests/d.jpg";
import Patient from "../assests/p.jpg";

import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <div className="nav">
        <div className="head">
          <h2>e-Medico</h2>
        </div>
        <ul>
          <li>Service</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className="container">
        <div className="button_text">
          <Link to="/PatientLogin">
            <img className="imge" src={Patient} alt="Patient Login" />
          </Link>
          <div className="button_label">Patient</div> 
        </div>
        <div className="button_text">
          <Link to="/DoctorLogin">
            <img className="imge" src={Doctor} alt="Doctor Login" />
          </Link>
          <div className="button_label">Doctor</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
