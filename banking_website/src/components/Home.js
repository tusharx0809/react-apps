import React, { useContext, useEffect } from "react";
import profileContext from "../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";
import UserAccounts from "./UserAccounts";
import Transactions from "./Transactions";
import Currencyconverter from "./Currencyconverter";
import InvestmentOptions from "./InvestmentOptions";

const Home = () => {
  const { getUserProfile, user, alert, getAccInfo } =
    useContext(profileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getUserProfile();
    getAccInfo();
    //eslint-disable-next-line
  }, []);

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
              zIndex: 1051,
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
      <div className="row">
        <div
          className="col-sm-12 col-md-6 col-lg-4 mb-4"
          style={{ marginTop: "70px" }}
        >
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">{user?.name}</h3>
              <h6 className="card-subtitle mb-2 text-muted">{user?.email}</h6>
              <p className="card-text">Welcome to your account!</p>
              <a href="#" className="card-link">
                Report an Issue
              </a>
            </div>
          </div>
          <UserAccounts />
          <Currencyconverter />
        </div>
        <div className="col-sm-12 col-md-8" style={{ marginTop: "70px" }}>
          <Transactions />
          <InvestmentOptions />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
