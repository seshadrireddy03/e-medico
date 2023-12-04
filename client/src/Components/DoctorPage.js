import React, { useEffect, useRef,useState } from "react";
import "../css/page.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Patient = () => {
  axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
  const navigate = useNavigate()
  const [user, setuser] = useState();
  const [filteredResults, setFilteredResults] = useState([]);   
  const [username, setUsername] = useState('');
  const commentRef = useRef(null);

  const getUser = async()=>{
    const config = {
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    }
    try {
      const { data } = await axios.post('/getdoctor', '', config);
      setuser(data);
  
      // Store the username in session storage
      if (data && data.username) {
        setUsername(data.username);
        console.log(data.username);
      }
    } catch (error) {
      // Handle error case if needed
      console.error(error);
    }
  };

   useEffect(() => {
    
    return () => {
      localStorage.getItem('token')&&getUser()
      
    }
  },[])
  
  useEffect(()=>{ fetchRecords();}
 
  )

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
      const response = await axios.get(`/getprecords/${username}`);
      
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

  console.log("Sdgffd");
  console.log(filteredResults);

  const handleSubmit = async (recordId) => {
    // Prepare data for the comment model
    console.log("comment")
    console.log(commentRef.current.value)
    const commentData = {
      recordId:recordId,
      comments:commentRef.current.value,
    };

    
    try {
      console.log(commentData);
      // Send a POST request to store comment in the comment model
      const response = await axios.post("/uploadcomment", commentData);
  
      if (response.data.success) {
        // Handle successful comment submission, e.g., remove the donor from the list
        // setFilteredResults((prevResults) => prevResults.filter((donor) => donor._id !== donorId));
        
        
        // Clear the comment input field after submission

        //alert(response.data.message);
      } else {
         //alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      //alert("Failed to submit comment. Please try again later.");
    }
  };

  
  return (
    <div className="body-p">
      <div className="nav">
        <div className="head">
          <h2>e-Medico</h2>
        </div>
        <h1>Hello Dr.{username}!!! </h1>
        <ul>
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
                  <p>Description: {record.description}</p>

                  {/* Conditional rendering based on comment existence */}
                  {record.comments ? (
                    <div>
                      <h4>Reviewed</h4>
                      <p>Comments: {record.comments}</p>
                    </div>
                  ) : (
                    <div>
                       <input
                        placeholder="Add comment..."
                        name="description"
                        required
                        ref={commentRef}                       
                      />
                      <button onClick={() => handleSubmit(record._id)}>Submit Comment</button>
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
   
       
     