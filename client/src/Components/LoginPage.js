import React from 'react';
import '../css/main.css'; // Make sure this points to the correct path of your CSS file
import patient from "../assests/p.jpg"
import doctor from "../assests/d.jpg"
import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div>
      <div className="nav">
        <div className="head">
          <h2>Medco</h2>
        </div>
        <ul>
          <li>Home</li>
          <li>Service</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
        <div className="btn">
          <Link to="/patientlogin" className="btn1">
            Sign In
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="button_text">
          <Link to="/patientlogin">
            <img className="patient-image" src={patient} alt="Patient Login" />
          </Link>
          <div className="button_label">Patient</div>
        </div>
        <div className="button_text">
          <Link to="/doctorlogin">
            <img className="doctor-image" src={doctor} alt="Doctor Login" />
          </Link>
          <div className="button_label">Doctor</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;