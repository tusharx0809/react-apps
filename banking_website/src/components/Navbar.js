import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileContext from "../context/Profile/ProfileContext";

const Navbar = () => {
  const { user, logoutUser, emp, enableDarkMode, mode } = useContext(profileContext);
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/login");

  };

  

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg ${
          mode === "dark" ? "bg-dark navbar-dark" : "bg-secondary navbar-light"
        }`}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-decoration-none" to="/">
            Banking
          </Link>
          <div class="form-check form-switch" style={{marginTop: "5px"}}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={enableDarkMode}
                  />
                  <label className={`form-check-label ${mode === "light" ? "text-white" : ""}`} for="flexSwitchCheckDefault">
                    {mode === "dark" ? "Light Mode" : "Dark Mode"}
                  </label>
                </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-2">
              
              {user && ( // Only display if user is not null
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      <button className="btn btn-dark">Home</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/loansinvestments"
                    >
                      <button className="btn btn-dark">
                        Loans & Investments
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/settings"
                    >
                      <button className="btn btn-dark">Settings</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {user || emp ? ( // Only display if user is not null
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/emplogin">
                  <button
                    type="button"
                    className="btn btn-outline-light mx-3"
                  >
                    Employee Login
                  </button>
                </Link>
                <Link to="/verifyemail">
                  <button type="button" className="btn btn-outline-light">
                    Get Your email verified!
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
