import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../context/Profile/ProfileContext";

const Verifyotp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const { alert, showAlert } = useContext(profileContext);

    const handleChange = (e) => {
        setOtp(e.target.value);
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5050/api/auth/verify-otp/",{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "authToken":localStorage.getItem("token"),              
            },
            body: JSON.stringify({
                "otp":otp,
            })
        });
        const json = await response.json();
        if(json.success){
            showAlert(json.message,"success");
            navigate("/");           
        }else{
            showAlert(json.error,"danger");
        }
    }
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
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
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <form onSubmit={verifyOtp}>
          <h2 className="text-center mb-4">Verify OTP</h2>
          <h5 className="mb-4">An OTP has been sent to your email which is valid for next five minutes.</h5>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter OTP..."
            />
          </div>
          

          <div className="d-flex justify-content-around">
            <button className="btn btn-success mt-2">Verify</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Verifyotp;
