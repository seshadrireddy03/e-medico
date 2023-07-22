import React, { useRef } from 'react';
import '../css/patient.css';
import patient from "../assests/p.jpg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientLogin = () => {
  const emailRef = useRef()
  const navigate = useNavigate()
  const passRef = useRef()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {data} = await axios.post('http://localhost:4000/api/v1/login',{
      email:emailRef.current.value,
      password:passRef.current.value
    })
    console.log(data);
    if(data.success){
      navigate('/patient')
      localStorage.setItem('token',data.authtoken)
    }
    else{
      alert(data.message)
    }
  }
  return (
    <div className='body'>
    <div className="container-patient">
      <img className='img-patient' src={patient} alt="Profile" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Email" ref={emailRef}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" ref={passRef}/>
        </div>
        <div className="form-group">
          <button type='submit'>Login</button>
        </div>
        <p>Dont have an account <Link to='/patientregister'>Register</Link></p>
      </form>
    </div>
    </div>
  );
};

export default PatientLogin;