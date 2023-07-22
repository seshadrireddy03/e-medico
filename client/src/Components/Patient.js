import React, { useEffect, useRef, useState } from "react";
import "../css/mainpage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Patient = () => {
  const navigate = useNavigate()
  const fileInput = document.getElementById('file')
  const file = fileInput?.files[0];
  
  const nameRef = useRef()
  const descRef = useRef()
  const ageRef = useRef()
  const docRef = useRef()
  const [user, setuser] = useState()
  const [comments, setcomments] = useState([])
  const handleSubmit = async(e) => {
    console.log(file);
    e.preventDefault()
    console.log(nameRef.current.value);
    const formdata = new FormData()
    formdata.append('name',nameRef.current.value)
    formdata.append('age',ageRef.current.value)
    formdata.append('description',descRef.current.value)
    formdata.append('doctor',docRef.current.value)
    formdata.append('photo',file)
    const {data} = await axios.post('http://localhost:4000/api/v1/upload',formdata)
    console.log(data);
  };
  const getComments = async(uname)=>{
    const {data} = await axios.get(`http://localhost:4000/api/v1/getcomment/${uname}`)
    setcomments(data)
  }
  const getUser = async()=>{
    const config = {
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    }
    const {data} = await axios.post('http://localhost:4000/api/v1/getpatient','',config)
    setuser(data)
    await getComments(data.username)
  }
  console.log(user);
  useEffect(() => {
    return () => {
      localStorage.getItem('token')&&getUser()
    }
  },[])
  
  
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="body-patient">
      <div className="top">
        <h1>Hello {user?.username}</h1>
        <button className="btn-main" onClick={handleLogout}>Logout</button>
        
      </div>
      
      <div className="upload-form">
        <form id="uploadForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            required
            ref={nameRef}
          />

          <label htmlFor="age">Age:</label>
          <input type="number" id="age" placeholder="Age" name="age" required ref={ageRef} />

          <label htmlFor="file">Upload File:</label>
          <input type="file" id="file" accept=".png, .jpg, .jpeg" required/>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Description"
            rows="4"
            name="description"
            required
            ref={descRef}
          ></textarea>

          <label htmlFor="doctor">Doctor:</label>
          <select id="doctor" name="doctor" required ref={docRef}>
            <option value="" disabled>
              Select Doctor
            </option>
            <option value="John">Dr. John</option>
            <option value="Sarah">Dr. Sarah</option>
            <option value="David">Dr. David</option>
          </select>
          
          <input type="submit" value="Upload" /><br/>
          {comments.map((c)=>{return (
            <>
              <div className="doctor-results">
                <p>From:{c.doctor}---<img src={c.url} alt="problem"/>---{c.comment}</p>
              </div>
            </>
          )})}
          
        </form>
      </div>
    </div>
  );
};

export default Patient;
