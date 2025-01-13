import React, { useContext, useEffect } from 'react'
import profileContext from '../context/Profile/ProfileContext';
import {useNavigate} from 'react-router-dom';
const Home = () => {
  const { getUserProfile, user } = useContext(profileContext);
  const navigate = useNavigate();


  useEffect(()=>{
    
    if(!localStorage.getItem("token")){
      navigate("/login");
    }
    getUserProfile();
    //eslint-disable-next-line
  },[getUserProfile])

  

  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  )
}

export default Home
