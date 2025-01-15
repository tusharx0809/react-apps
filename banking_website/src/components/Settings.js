import React, { useContext, useState } from 'react'
import profileContext from '../context/Profile/ProfileContext'

const Settings = () => {
  const { alert, showAlert } = useContext(profileContext);
  const [passwords, setPasswords] = useState({
    curpassword:"",
    password:"",
    cpassword:"",
  })
  const handleChange = (e) => {
    setPasswords({...passwords, [e.target.name]:e.target.value});
  }

  const renewPassword = async (e) => {
    e.preventDefault();
    if(passwords.password !== passwords.cpassword){
      showAlert("Passwords must be same in New password and Confirm password!","danger");
      return;
    }
    
    const response = await fetch('http://localhost:5050/api/settings/renewpassword',{
      method:'PUT',
      headers:{
        "Content-Type":"application/json",
        "authToken":localStorage.getItem("token"),
      },
      body:JSON.stringify({
        curpassword: passwords.curpassword,
        password: passwords.password,
      })
    })
    const json = await response.json();
    if(json.success){
      showAlert(json.message,"success");
    }else{
      showAlert(json.error,"danger");
    }
  }

  return (
    <div>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <div className="row w-100 justify-content-center">
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
              }}
            >
              {alert.message}
            </div>
          )}

          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            {/* First Card */}
            <div className="card p-4">
              <form onSubmit={renewPassword}>
                <h2 className="text-center mb-4">Renew Password</h2>
                <div className="d-flex align-items-center justify-content-center mb-3">
                  Current Password
                  <input
                    type="password"
                    className="form-control"
                    id="curpassword"
                    name="curpassword"
                    value={passwords.curpassword}
                    onChange={handleChange}
                    placeholder="Current password..."
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center mb-3">
                  New Password
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={passwords.password}
                    onChange={handleChange}
                    placeholder="New password..."
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center mb-3">
                  Confirm Password
                  <input
                    type="password"
                    className="form-control"
                    id="cpasssword"
                    name="cpassword"
                    value={passwords.cpassword}
                    onChange={handleChange}
                    placeholder="Confirm password..."
                  />
                </div>

                <div className="d-flex justify-content-around">
                  <button className="btn btn-success mt-2">Renew</button>
                </div>
              </form>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default Settings;
