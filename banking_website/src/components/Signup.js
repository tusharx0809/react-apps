import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5050/api/auth/signup',{
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
    }else{
        console.log(json.error);
    }
  };
  return (
    <div>
      <form onSubmit={signUp}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || " "}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || " "}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password || ""}
          onChange={handleChange}
        />
        <label htmlFor="dob">DOB:</label>
        <input
          type="text"
          id="dob"
          name="dob"
          value={formData.dob || " "}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone || " "}
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
