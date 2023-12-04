import React, { useRef } from 'react';
import '../css/login.css';
import vol from "../assests/d.jpg"; 
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import  { useState } from 'react';

const DoctorLogin = () => {
  const emailRef = useRef();
  const passRef = useRef();
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {data} = await axios.post('http://localhost:5000/api/v1/DoctorLogin',{
      email:emailRef.current.value,
      password:passRef.current.value
    })
    console.log(data);
    if(data.success){
      navigate('/DoctorPage')
      localStorage.setItem('token',data.authtoken)
    }
    else{
      alert(data.message)
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: isHovered ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'color  ease',
  };

  return (
    <div className='body'>
      <div className="nav">
        <div className="head">
          <h2>e-Medico</h2>
        </div>
        <ul>
          <li><Link
        to="/LoginPage"
        className='buttons'
        style={linkStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Home
      </Link></li>
          <li>Service</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className="container-p">
        <img className='img-p' src={vol} alt="Profile" /> 
        <h2>Doctor Login</h2> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Email" ref={emailRef} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" ref={passRef} />
          </div>
          <div className="form-group">
            <button type='submit' className='sub-btn'>Login</button>
          </div>
          <p>Don't have an account? 
            <Link to="/DoctorRegister" style={{ color: 'blue' }} // Default color when not active
            activeStyle={{ color: 'red' }} // Color when the link is active (clicked)
            >Register
            </Link>
            </p> 
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
