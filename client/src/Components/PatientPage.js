import React, { useEffect, useRef, useState } from "react";
import "../css/page.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Patient = () => {
  const navigate = useNavigate()
  // const fileInput = document.getElementById('file')
  // const file = fileInput?.files[0];
  
  const nameRef = useRef()
  const descRef = useRef()
  const locationRef = useRef()
  const phoneRef = useRef()
  const [user, setuser] = useState()
  const [doctors, setDoctors] = useState([]); 

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/doctors'); // Replace with your API endpoint to fetch doctors
      console.log(response)
      if (response.data.success) {
        setDoctors(response.data.data); // Set the list of doctors in state
      } else {
        // Handle error case if needed
      }
    } catch (error) {
      console.error(error);
      // Handle error case if needed
    }
  };

  const handleSubmit = async(e) => {
    console.log("puuu");
    e.preventDefault();
    const fileInput = document.getElementById('file'); // Move this line inside the function
    const file = fileInput?.files[0];
    console.log(file + "asjhjhg");
    e.preventDefault()
    console.log(descRef.current.value + "ygdjagsdjgasjdgjasdgj");
    const formdata = new FormData()
    formdata.append('name',nameRef.current.value)
    formdata.append('dname',locationRef.current.value)
    formdata.append('description',descRef.current.value)
    formdata.append('phoneno',phoneRef.current.value)
    for (let pair of formdata.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    const {data} = await axios.post('http://localhost:5000/api/v1/upload',formdata, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(data);
    locationRef.current.value = "";
    descRef.current.value = "";
    phoneRef.current.value = "";
    alert("Submitted!!!")
  };


  
  const getUser = async()=>{
    const config = {
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    }
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/getpatient', '', config);
      setuser(data);
  
      // Store the username in session storage
      if (data && data.username) {
        sessionStorage.setItem('username', data.username);
        console.log(data.username);
      }
    } catch (error) {
      // Handle error case if needed
      console.error(error);
    }
  };
  
  console.log(user);
  useEffect(() => {
    fetchDoctors();
    return () => {
      localStorage.getItem('token')&&getUser()
      
    }
  },[])
  
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: isHovered ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'color  ease',
  };

  
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="body-p">
      <div className="nav">
        <div className="head">
          <h2>e-Medico</h2>
        </div>
        <div className="leftnav">
        <ul>
          <Link to="/HistoryPatient"className='buttons1'style={linkStyle}onMouseEnter={() => setIsHovered(true)}onMouseLeave={() => setIsHovered(false)}><li>History</li></Link>
          <li className="btn-main" onClick={handleLogout}>Logout</li>
        </ul>
        </div>
        
          
      </div>

    <div className="form">
    <h1>Hello {user?.username}!!! </h1>
    <div className="formdiv">
      
      <form id="uploadForm" onSubmit={handleSubmit} className="center-form">
        <div className="form-group">
          <input type="text" id="name" placeholder="Name" name="name" defaultValue={user?.username} required ref={nameRef}/>
        </div>
        <div className="form-group">
          <input type="text" id="phoneno" placeholder="Phone no." name="phoneno" required ref={phoneRef} />
        </div>
        <div className="form-group">
          <textarea
            id="description"
            placeholder="Description"
            rows="3"
            name="description"
            required
            ref={descRef}
          ></textarea>
        </div>
        <div className="form-group">
          <select id="location" name="location" required ref={locationRef}>
            <option value="" disabled>
              Select Doctor
            </option>
            {/* Map through the doctors and create options for each */}
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.username}>
                {doctor.username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Upload"/><br/>
        </div>
        </form>
    </div>    
  </div>
  </div>
);
};

export default Patient;
   
       
     