import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //instead of useHistory

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault(); //to not reload page
        const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log("login API response:",json);
    if (json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.showAlert("Logged in successfully","success");
        navigate("/");
    }else{
        props.showAlert("Invalid Details!","danger")
    }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="passowrd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={credentials.password}
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
