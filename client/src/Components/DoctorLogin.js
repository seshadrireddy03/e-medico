import React, { useRef } from 'react';
import '../css/patient.css';
import doctor from "../assests/d.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorLogin = () => {
  const emailRef = useRef()
  const navigate = useNavigate()
  const passRef = useRef()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {data} = await axios.post('http://localhost:4000/api/v1/doctorlogin',{
      email:emailRef.current.value,
      password:passRef.current.value
    })
    console.log(data);
    if(data.success){
      navigate('/doctor')
      localStorage.setItem('token',data.authtoken)
    }
  }
  return (
    <div className='body'>
    <div className="container-patient">
      <img className='img-patient' src={doctor} alt="Profile" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Email" ref={emailRef}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" ref={passRef}/>
        </div>
        <div className="form-group">
          <button type='submit' className='sub-btn'>Login</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default DoctorLogin;