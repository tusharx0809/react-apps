import React, { useContext, useEffect } from "react";
import profileContext from "../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { getUserProfile, user, alert } = useContext(profileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getUserProfile();
    //eslint-disable-next-line
  }, [getUserProfile]);

  return (
    <div className="container-sm">
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
      <div style={{ marginTop: "70px" }}>
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">{user?.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{user?.email}</h6>
            <p className="card-text">
              Welcome to your account!
            </p>
            <a href="#" className="card-link">
              Report an Issue
            </a>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
