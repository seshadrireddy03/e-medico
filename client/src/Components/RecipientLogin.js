import React, { useRef } from 'react';
import '../css/p.css';
import rec from "../assests/d.jpg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipientLogin = () => {
  const emailRef = useRef()
  const navigate = useNavigate()
  const passRef = useRef()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {data} = await axios.post('http://localhost:4000/api/v1/recipientlogin',{
      email:emailRef.current.value,
      password:passRef.current.value
    })
    console.log(data);
    if(data.success){
      navigate('/recipient')
      localStorage.setItem('token',data.authtoken)
    }
  }
  return (
    <div className='body'>
    <div className="container-p">
      <img className='img-p' src={rec} alt="Profile" />
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
        <p>Dont have an account <Link to="/RecipientRegister">Register</Link></p>
      </form>
    </div>
    </div>
  );
};

export default RecipientLogin;