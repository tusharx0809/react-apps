import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Verifyotp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

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
            alert(json.message);
            navigate("/");
        }else{
            alert(json.error);
        }
    }
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
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
