import React, { useContext, useEffect } from "react";
import profileContext from "../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";

const LoansAndInvestments = () => {
  const navigate = useNavigate();
  const { alert, showAlert, user, getUserProfile, mode } = useContext(profileContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getUserProfile();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container-sm">
      {/* Alert Section */}
      <div>
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
            }}
          >
            {alert.message}
          </div>
        )}
      </div>

      {/* Cards Section */}
      <div className="row" style={{ marginTop: "70px" }}>
        <div className="col-md-6">
          <div className={`card mb-4 ${
              mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
            }`} style={{ height: "351px" }}>
            <div className="card-body">
              <div className="d-flex justify-content-around">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <p className="fs-3 fw-light">Apply for Loans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className={`card mb-4 ${
              mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
            }`} style={{ height: "351px" }}>
            <div className="card-body">
              <div className="d-flex justify-content-around">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <p className="fs-3 fw-light">Apply for Investments Plans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansAndInvestments;
