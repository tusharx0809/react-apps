import React from 'react'
import { Link } from 'react-router-dom';

const Emplogin = () => {

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
      <form> 
      <h2 className="text-center mb-4">Employee Login</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Emp ID
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            // onChange = {handleChange}
            placeholder="Enter email..."
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            // onChange={handleChange}
            placeholder="Enter password..."
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
        <Link to="/signup">
        </Link>
      </form>
      </div>
    </div>
  )
}

export default Emplogin
