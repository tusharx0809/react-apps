import React, { useContext } from 'react'
import profileContext from '../context/Profile/ProfileContext'
const LoansAndInvestments = () => {

    const { alert, showAlert } = useContext(profileContext);

  return (
    <div className='container-sm'> 
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
      This is loans and investments.
    </div>
  )
}

export default LoansAndInvestments
