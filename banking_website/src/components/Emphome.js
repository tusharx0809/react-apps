import React,{ useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import profileContext from '../context/Profile/ProfileContext';
import Currencyconverter from './Currencyconverter';

const Emphome = () => {
  const { alert, showAlert, emp, getEmp } = useContext(profileContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("empAuthToken")) {
      navigate("/login");
    }
    getEmp();
    // eslint-disable-next-line
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
              <h3 className="card-title">{emp?.name}</h3>
              <h6 className="card-subtitle mb-2 text-muted">{emp?.name}</h6>
              <p className="card-text">{emp?.position}</p>
              
            </div>
          </div>
          <Currencyconverter/>
        </div>
        <div className="col-sm-12 col-md-6" style={{ marginTop: "70px" }}>
         
        </div>
        
      </div>
    </div>
  )
}

export default Emphome
