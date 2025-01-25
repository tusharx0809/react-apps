import React, { useContext } from 'react'
import profileContext from '../context/Profile/ProfileContext';

const InvestmentOptions = () => {
  const { mode } = useContext(profileContext);
  return (
    <div>
        <div className={`card mb-4 ${
              mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
            }`} style={{ marginTop:"25px", height: "226px", overflowY: "scroll" }}>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <p className="fs-2 fw-light">
                    Investments
                  </p>
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default InvestmentOptions
