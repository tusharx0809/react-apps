import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
      <form>
      <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
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
