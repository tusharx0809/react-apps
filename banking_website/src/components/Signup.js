import React, { useState } from 'react'
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] =useState({
        name:'',
        email:'',
        password:'',
        dob:'',
        phone:'',
    })

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({ ...formData, [name]: value });

    }
    const signUp = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData)
            if(response.success){
                localStorage.setItem("token", response.authToken);
            }
            
        } catch (error) {   
            console.error(error.response ? error.response.data : error.message);
        }
    }
  return (
    <div>
      <form onSubmit={signUp}>
        <label htmlFor="name">Name:</label>
        <input 
        type="text" 
        id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}/>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}/>
        <label htmlFor="dob">DOB:</label>
        <input type="text" id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}/>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}/>
            <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
