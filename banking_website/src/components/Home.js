import React, { useContext, useEffect } from 'react'
import profileContext from '../context/Profile/ProfileContext';

const Home = () => {
  const { getUserProfile, user } = useContext(profileContext);

  useEffect(()=>{
    getUserProfile();
  },[])

  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  )
}

export default Home
