import React, { useEffect, useRef, useState } from "react";
import "../css/mainpage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Donor = () => {
  const navigate = useNavigate()
  // const fileInput = document.getElementById('file')
  // const file = fileInput?.files[0];
  
  const nameRef = useRef()
  const descRef = useRef()
  const locationRef = useRef()
  const phoneRef = useRef()
  const [filteredResults1, setFilteredResults1] = useState([]);
  const [user, setuser] = useState()

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
    formdata.append('location',locationRef.current.value)
    formdata.append('description',descRef.current.value)
    formdata.append('phoneno',phoneRef.current.value)
    for (let pair of formdata.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    const {data} = await axios.post('http://localhost:4000/api/v1/upload',formdata, {
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

  const fetchDonors1 = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/getdonor00/${user.username}`);
      
      if (response.data.success) {
        setFilteredResults1(response.data.data);
      } else {
        setFilteredResults1()
        //alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      ////alert("Failed to fetch donor details. Please try again later.");
    }
  };
  fetchDonors1();
  
  const getUser = async()=>{
    const config = {
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    }
    const {data} = await axios.post('http://localhost:4000/api/v1/getdonor','',config)
    setuser(data)

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
    <div className="body-p">
      <div className="top">
        <h1>Hello {user?.username}!!! </h1>
        <button className="btn-main" onClick={handleLogout}>Logout</button>
        
      </div>
      
      <div className="upload-form">
        <form id="uploadForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Name" name="name" defaultValue={user?.username} required ref={nameRef}/>
          
          <label htmlFor="phoneno">Phoneno:</label>
          <input type="text" id="phoneno" placeholder="Phone no." name="phoneno" required ref={phoneRef} />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Description"
            rows="3"
            name="description"
            required
            ref={descRef}
          ></textarea>
          
          <label htmlFor="location">Location:</label>
          <select id="location" name="location" required ref={locationRef}>
            <option value="" disabled>
              Select Location
            </option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Banglore">Banglore</option>
          </select>
          
          <input type="submit" value="Upload"/><br/>
  
          
        </form>
      </div>
      <h1>History</h1>
    {filteredResults1?.length > 0 ? (
    filteredResults1.map((donor) => {
      return (
        <div className="donor-details" key={donor._id} style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
            
          <div>
            <p>Recepient Name: {donor.rname}</p>
            <p>Phone No. of Recepient: {donor.rphoneno}</p>
          </div>
          <div>
            <p>Volunter Name: {donor.vname}</p>
            <p>Phone No. of Volunter: {donor.vphoneno}</p>
          </div>
          <div>
          <p>Location: {donor.location}</p>
          </div>
          <div>
            <p>Description: {donor.description}</p>
          </div>
        </div>
        
        
      );
    })
  ) : (
    <h6>No History in the city</h6>
  )}
    </div>
    
  );
};

export default Donor;
