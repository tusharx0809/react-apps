import React,{ useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import profileContext from '../context/Profile/ProfileContext';

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
    <div>
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
     {emp?.empid}
    </div>
  )
}

export default Emphome
