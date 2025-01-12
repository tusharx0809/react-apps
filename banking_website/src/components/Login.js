import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileContext from "../context/Profile/ProfileContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email:"",
    password:""
  });
  const navigate = useNavigate();
  const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const login = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:5050/api/auth/login/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        }),
    });
    const json = await response.json();
    if(json.success && json.isVerified){
        localStorage.setItem("token",json.authToken);
        navigate("/");
    }else if(json.success && !json.isVerified){
        alert("Your email is not verified yet, please verify your email first!");
    }else{
        alert("Login failed, please check credentials");
    }
    
  }
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
      <form onSubmit={login}> 
      <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange = {handleChange}
            placeholder="Enter email..."
          />
          
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
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
        <Link to="/signup">
        <button className="btn btn-success mx-3">
          SignUp
        </button></Link>
      </form>
      </div>
    </div>
  );
};

export default Login;
