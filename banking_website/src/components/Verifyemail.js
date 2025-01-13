import React, { useState } from 'react'

const Verifyemail = () => {
    const [email, setEmail ] = useState("");
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const verifyEmail = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5050/api/auth/verify-email/",{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem("email",email);
            alert(json.message);
        }else{
            alert("Something went wrong, please try again!");
        }
    }
  return (
    <div>
      <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <form onSubmit={verifyEmail}>
          <h2 className="text-center mb-4">Verify Email</h2>
          <h5 className="mb-4">Enter your registered email</h5>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="otp"
              name="otp"
              value={email}
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter email..."
            />
          </div>
          

          <div className="d-flex justify-content-around">
            <button className="btn btn-success mt-2">Send OTP</button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Verifyemail
