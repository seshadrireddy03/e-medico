import React, { useEffect, useState } from "react";
import "../css/page.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Patient = () => {
  axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
  const navigate = useNavigate()
  const [filteredResults, setFilteredResults] = useState([]);
    
  const [username, setUsername] = useState('');
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  console.log(username);

  useEffect(() => {
    return () => {
      localStorage.getItem('token');
      
    }
  })
  
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

  const fetchRecords = async () => {
    try {
      console.log(username)
      const response = await axios.get(`/getRecords/${username}`);
      
      if (response.data.success) {
        setFilteredResults(response.data.data);
      } else {
        setFilteredResults()
        //alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      ////alert("Failed to fetch donor details. Please try again later.");
    }
  };
  fetchRecords();
  console.log("Sdgffd");
  console.log(filteredResults);

  return (
    <div className="body-p">
      <div className="nav">
        <div className="head">
          <h2>e-Medico</h2>
        </div>
        <h1>Hello {username}!!! </h1>
        <ul>
          <Link to="/PatientPage"className='buttons1'style={linkStyle}onMouseEnter={() => setIsHovered(true)}onMouseLeave={() => setIsHovered(false)}><li>Consult</li></Link>
          <li className="btn-main" onClick={handleLogout}>Logout</li>
        </ul>
      </div>

    <div className="records">
        <div className="record-div">
          {filteredResults?.length > 0 ? (
            filteredResults.map((record) => {
              return (
                <div
                  className="card"
                  key={record._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                >
                  <p>Name: {record.name}</p>
                  <p>Phone No.: {record.phoneno}</p>
                  <p>Doctor Name: {record.dname}</p>
                  <p>Description: {record.description}</p>

                  {/* Conditional rendering based on comment existence */}
                  {record.comments ? (
                    <div>
                      <h4>Reviewed</h4>
                      <p>Comments: {record.comments}</p>
                    </div>
                  ) : (
                    <div>
                      <h4>To be Reviewed</h4>
                      <p>No comments yet</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <h6>No History in the city</h6>
          )}
        </div>
      </div>
    </div>
  );
};


export default Patient;
   
       
     