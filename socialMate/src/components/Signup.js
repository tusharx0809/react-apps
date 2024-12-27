import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import profileContext from "../context/profile/ProfileContext";
const Signup = () => {
    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({name:"", email:"", password:"",cpassword:"", username:"", dob:""})
    const navigate = useNavigate();
    const context = useContext(profileContext);
    const { alert, showAlert, getUserProfile } = context;
    const createUser = async (e) => {
        e.preventDefault();
        const { name,email,password,cpassword,username,dob } = credentials;
        if(password !== cpassword){
          showAlert("Passwords msut be same!","danger")
          return
        }
        const response = await fetch(`${host}/api/auth/createuser/`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name,email,password,username,dob})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authToken);
            navigate("/")
            showAlert("Account created successfully!","success");
            getUserProfile();
        }else{
            showAlert(json.error,"danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

     useEffect(() => {
      // Set max date to ensure users are at least 18 years old
       const dobInput = document.getElementById('dob');
       const today = new Date();
       const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
       dobInput.setAttribute('max', eighteenYearsAgo);
   }, []);

  return (
    <div>
      <div>
        {/* Display alert if exists */}
        {alert && alert.message && alert.type && (
          <div
            className={`box ${
              alert.type === "success"
                ? "has-background-primary-light has-text-black-bis"
                : alert.type === "danger"
                ? "has-background-danger-light has-text-black-bis"
                : ""
            }`}
            style={{
              position: "fixed",
              top: "70px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              width: "500px",
              padding: "10px",
              textAlign: "center",
              borderRadius: "20px",
            }}
          >
            {alert.message}
          </div>
        )}
      </div>
      <div className="columns is-flex is-justify-content-center is-align-items-center" style={{height:"100vh"}}>
        <div className="column is-one-quarter has-text-centered">
        <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4 my-4">Login</p>
                </div>
              </div>
              <form onSubmit={createUser}>
              <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="text"
                      placeholder="Enter name..."
                      onChange={onChange}
                      id="name"
                      name="name"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="email"
                      placeholder="Enter email..."
                      onChange={onChange}
                      id="Email"
                      name="email"
                    />
                    <span className="icon is-small is-left">
                    <i class="fa-solid fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="type"
                      placeholder="Enter username..."
                      
                      onChange={onChange}
                      id="username"
                      name="username"
                    />
                    <span className="icon is-small is-left">
                    <i class="fa-solid fa-circle-user"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="password"
                      placeholder="Enter Password..."
                     
                      onChange={onChange}
                      name="password"
                      id="password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fa-solid fa-key"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="password"
                      placeholder="Confirm Password"
                     
                      onChange={onChange}
                      name="cpassword"
                      id="cpassword"
                    />
                    <span className="icon is-small is-left">
                      <i className="fa-solid fa-key"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Date of Birth</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-success"
                      type="date"
                      onChange={onChange}
                      name="dob"
                      id="dob"
                    />
                    <span className="icon is-small is-left">
                    <i class="fa-solid fa-calendar-days"></i>
                    </span>
                  </div>
                </div>
                <div className="buttons mt-5 is-flex is-justify-content-center my-4">
                  <button className="button is-primary mx-1" type="submit">
                    Signup
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
