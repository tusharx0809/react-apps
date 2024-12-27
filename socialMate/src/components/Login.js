import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import profileContext from "../context/profile/ProfileContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const { alert, showAlert, getUserProfile, getAllPosts } =
    useContext(profileContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); //to not reload page
    const response = await fetch("http://localhost:5000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log("API response:", json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      await getUserProfile(); // Fetch user profile
      await getAllPosts();
      navigate("/");
      showAlert("Logged in successfully", "success");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
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
              zIndex: 10,
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
      <div
        className="columns is-flex is-justify-content-center is-align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="column is-one-quarter has-text-centered">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4 my-4">Login</p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Username or Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="text"
                      placeholder="Enter username or email to login"
                      value={credentials.email || ""}
                      onChange={onChange}
                      id="Email"
                      name="email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="password"
                      placeholder="Enter Password"
                      value={credentials.password || ""}
                      onChange={onChange}
                      name="password"
                      id="password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fa-solid fa-key"></i>
                    </span>
                  </div>
                </div>
                <div className="buttons mt-5 is-flex is-justify-content-center my-4">
                  <button className="button is-primary mx-1" type="submit">
                    Login
                  </button>
                  <Link to="/signup">
                    <button className="button is-primary mx-1">Sign Up</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
