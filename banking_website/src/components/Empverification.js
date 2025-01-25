import React, { useState, useContext } from "react";
import profileContext from "../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";

const Empverification = () => {
  const [otp, setOtp] = useState("");
  const { alert, showAlert, mode } = useContext(profileContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setOtp(e.target.value);
}
  const verifyEmpOtp = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5050/api/employees/verifyEmpOtp',{
        method:"PUT",
        headers:{
            "empAuthToken":localStorage.getItem("empAuthToken"),
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            otp: otp,
        }),  
    })
    const json = await response.json();
    if(json.success){
        navigate("/emphome");
        showAlert(json.message,"success");
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
      <div className={`card p-4 ${
              mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
            }`} style={{ width: "100%", maxWidth: "400px" }}>
        <form onSubmit={verifyEmpOtp}>
          <h2 className="text-center mb-4">Verify OTP</h2>
          <h5 className="mb-4">
            An OTP has been sent to your email which is valid for next five
            minutes.
          </h5>
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

export default Empverification;
