import React, {useContext, useState} from 'react'
import profileContext from '../context/Profile/ProfileContext';
import { useNavigate } from 'react-router-dom';

const Emplogin = () => {
  const { alert, showAlert, mode } = useContext(profileContext);
  const navigate = useNavigate();
  const [empDetails, setEmpDetails] = useState({
    empid:"",
    password:"",
  });


  const handleChange = (e) =>{
    setEmpDetails({...empDetails, [e.target.name]: e.target.value})
  }

  const emplogin = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5050/api/employees/emplogin',{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        empid: empDetails.empid,
        password: empDetails.password,
      })
    })
    const json = await response.json();
    if(json.success){
      localStorage.setItem("empAuthToken", json.authToken);
      navigate("/empverify");
      showAlert("An otp has been sent to registered email.","success");
    }else{
      showAlert("Somethins went wrong, try again!","danger");
    }
  } 
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
      <div>
        {/* Display alert if exists */}
        {alert && alert.message && alert.type && (
          <div
            className={`alert ${
              alert.type === "success"
                ? "alert-primary"
                : alert.type === "danger"
                ? "alert-danger"
                : ""
            }`}
            style={{
              position: "fixed",
              top: "70px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              width: "600px",
              padding: "10px",
              textAlign: "center",
              // borderRadius: "20px",
            }}
          >
            {alert.message}
          </div>
        )}
      </div>
        <div className={`card p-4 ${
              mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
            }`} style={{ width: "100%", maxWidth: "400px" }}>
      <form onSubmit={emplogin}> 
      <h2 className="text-center mb-4">Employee Login</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Emp ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empid"
            name="empid"
            onChange = {handleChange}
            placeholder="Enter employee ID..."
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password..."
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
      </form>
      </div>
    </div>
  )
}

export default Emplogin
