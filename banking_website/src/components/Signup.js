import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../context/Profile/ProfileContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    dob: "",
    phone: "",
  });
  const { alert, showAlert } = useContext(profileContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      showAlert("Please enter the same passwords!","danger");
      return;
    }
    const response = await fetch("http://localhost:5050/api/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        phone: formData.phone,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/verifyotp");
      showAlert("User Registerd, an OTP has been sent for verification","success")
    } else{
      showAlert(json.error,"danger");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
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
        <form onSubmit={signUp}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter Full Name..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your Email..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter Password (At least 8 characters)"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={handleChange}
              value={formData.cpassword}
              placeholder="Confirm password..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="Enter Phone Number..."
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
