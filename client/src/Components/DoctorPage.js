import React, { useEffect, useState } from "react";
import "../css/doctorpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DoctorPage = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState();
  const [comment, setcomment] = useState();
  const [filtredresults, setfiltredresults] = useState(null);
  const onChange = (e) => {
    setcomment(e.target.value);
  };
  console.log(filtredresults);
  const [details, setDetails] = useState([]);
  const handleSubmit = async (pname,url) => {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/uploadcomment",
      {
        patient: pname,
        doctor: user.username,
        comment: comment,
        url:url
      }
    );
    const output = await axios.delete(
      `http://localhost:4000/api/v1/deleteform/${data.output.patient}`
    );
    alert(data.message);
    setcomment("");
    setfiltredresults(
      details.filter((d) => {
        return d.name !== pname;
      })
    );
  };
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    return
  };
  const getPatients = async (uname) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/getpatients/${uname}`
    );
    setDetails(data);
    setfiltredresults(data);
  };
  const getDoctor = async () => {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/getdoctor",
      "",
      config
    );
    setuser(data);
    getPatients(data.username);
  };
  console.log(user);
  useEffect(() => {
    return () => {
      
      localStorage.getItem('token')&&getDoctor();
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Hi {user?.username}</h1>
        <button className="log-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {filtredresults?.length>0 ? (
        filtredresults.map((d) => {
          return (
            <>
              <div className="doctor-main">
                <div>
                  <p>{d.name}</p>
                  <p>{d.age}</p>
                </div>
                <div>
                  <img
                    src={d.url}
                    style={{ width: "400px", height: "250px" }}
                    alt="problem"
                  />
                  <p>
                    Click <a href={d.url}>here</a> for detailed image
                  </p>
                </div>
                <p>{d.description} </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(d.name,d.url);
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <textarea placeholder="comments" onChange={onChange} />
                    <button className="sub-btn" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </>
          );
        })
      ) : (
        <h1>No requests</h1>
      )}
    </>
  );
};

export default DoctorPage;
