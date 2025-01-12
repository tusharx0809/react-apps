import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword:"",
    dob: "",
    phone: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.cpassword){
      alert("Please enter same passwords!");
      return;
    }
    const response = await fetch("http://localhost:5050/api/auth/signup/",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            dob: formData.dob,
            phone: formData.phone,
        })       
    });
    const json = await response.json();
    if(json.success){
        localStorage.setItem("token",json.authToken);
        console.log(json);
    }else{
        console.log(json);
    }
  };
  return (
    <div className="container">
      <form onSubmit={signUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Enter Full Name..."
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Enter your Email..."
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Enter Password (Atleast 8 characters)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={handleChange}
            value={formData.cpassword}
            placeholder="Confirm password..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            onChange={handleChange}
            value={formData.dob}
            placeholder="Enter date of birth..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            placeholder="Enter Phone Number..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
        
      </form>
      
    </div>
  );
};

export default Signup;
