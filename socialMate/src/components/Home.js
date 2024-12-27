import React, { useContext } from "react";
import Profile from "./Profile";
import profileContext from "../context/profile/ProfileContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  if(!localStorage.getItem('token')){
    navigate('/login');
  }
  const { alert } = useContext(profileContext);
  return (
    <>
      <div>
        {/* Display alert if exists */}
        {alert && alert.message && alert.type && (
          <div
            className={`box ${
              alert.type === "success"
                ? "has-background-primary-light has-text-black-bis"
                : alert.type === "danger"
                ? "has-background-danger-light has-text-black-bis"
                : ""
            }`}
            style={{
              position: "fixed",
              top: "70px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              width: "500px",
              padding: "10px",
              textAlign: "center",
              borderRadius: "20px",
            }}
          >
            {alert.message}
          </div>
        )}
      </div>
      <Profile />
    </>
  );
};

export default Home;
