import React, { useContext, useEffect } from "react";
import profileContext from "../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { getUserProfile, user, alert, accInfo, getAccInfo } = useContext(profileContext);
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
        <div>
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-around">
                <div className="col-6">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <h5>Chequings</h5>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body"><i class="fa-solid fa-indian-rupee-sign fa-sm"/> {accInfo?.cheqAcc?.amount}</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <h5>Savings</h5>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body"><i class="fa-solid fa-indian-rupee-sign fa-sm"/> {accInfo?.savAcc?.amount} </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="p-5"><button className="btn btn-primary btn-lg">Transfer&#8594;</button></div>
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

export default Home;
