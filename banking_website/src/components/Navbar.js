import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileContext from "../context/Profile/ProfileContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(profileContext);
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/login");
    window.location.reload(true);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-decoration-none" to="/">
            Banking
          </Link>
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
                      Home
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {user ? ( // Only display if user is not null
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            ) : (
              <button type="button" class="btn btn-outline-light">
                Get Your email verified!
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
