import React, { useRef } from 'react';
import '../css/p.css'; // Make sure this points to the correct path of your CSS file
import rec from "../assests/d.jpg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const VolunterRegister = () => {
  const emailRef = useRef()
  const passRef = useRef()
  const nameRef = useRef()
  const dobRef = useRef()
  const phoneRef=useRef()
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {data} = await axios.post('http://localhost:4000/api/v1/createrecipient',{
      email:emailRef.current.value,
      password:passRef.current.value,
      username:nameRef.current.value,
      phone:phoneRef.current.value,
      dob : dobRef.current.value
    })
    if(data.success){
      navigate('/RecipientLogin')
    }
  }
  return (
    <div className='body'>
    <div className="container-p">
    <img className='img-p' src={rec} alt="Profile" />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email" ref={emailRef}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" ref={passRef}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Name" ref={nameRef}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Phone No." ref={phoneRef}/>
        </div>
        <div className="form-group">
          <input type="date" placeholder="DOB" ref={dobRef}/>
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>Have an account? <Link to="/RecipientLogin">Login</Link></p>
    </div>
    </div>
  );
};

export default VolunterRegister;