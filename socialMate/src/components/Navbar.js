import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "../context/profile/ProfileContext";

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(profileContext);
  const { user, setUser, getUserProfile, alert, showAlert } = context;
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  //Handling FriendsRequests
  const [isFriendsModal, setIsFriendsModal] = useState(false);
  const removeFriend = async (friendID) => {
    const id = user._id;
    const url = `http://localhost:5000/api/friends/remove-friend/${friendID}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    if (json.message === "Friend Removed") {
      showAlert("Friend removed from Friend List", "success");
      getUserProfile();
    } else {
      alert("No Such friend Exists");
    }
  };
  const acceptRequest = async (friendID) => {
    const id = user._id;
    const url = `http://localhost:5000/api/friends/accept-request/${friendID}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    if (json.message === "Friend request accepted") {
      showAlert("Friend Added", "success");
      getUserProfile();
    } else {
      showAlert("Not Added", "danger");
    }
  };
  const rejectRequest = async (friendID) => {
    const id = user._id;
    const url = `http://localhost:5000/api/friends/reject-request/${friendID}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    if (json.message === "Friend Request Rejected") {
      showAlert("Friend Request Rejected", "success");
      getUserProfile();
    } else {
      showAlert("Something went wrong, Please Reload!", "danger");
    }
  };

  //Handling Rest password
  const [isSettingsModal, setisSettingsModal] = useState(false);
  const [password, setPassword] = useState({
      curPassword:"",
      newPassword:"",
      cpassword:""
    })
    const handlePasswordChange = (e) => {
      setPassword((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  const resetPassword = async () => {
    const { curPassword, newPassword, cpassword } = password;
    if (newPassword.trim() !== cpassword.trim()) {
      showAlert("Passwords must be same! Please Try again!","danger");
      setisSettingsModal(false);
      return;  
    }
    const response = await fetch(
      "http://localhost:5000/api/settings/reset-password",
      {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword: curPassword, password: newPassword }),
      }
    );
    const json = await response.json();
    if (json.success === true) {
      showAlert("Password successfully reset","success");
      setisSettingsModal(false);
    } else {
      showAlert(json.message,"danger");
    }
  };

  //Deleting account
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [dpassword, setdpassword] = useState("");
    const handleDeleteAccountPassword = (e) =>{
      setdpassword(e.target.value);
    }
    const deleteAccount = async () => {
      const d_password = dpassword;
      const response = await fetch('http://localhost:5000/api/settings/delete-account',{
        method:'DELETE',
        headers:{
          'auth-token':localStorage.getItem('token'),
          'Content-type':'application/json'
        },
        body: JSON.stringify({password: d_password})
      })
      const json = await response.json();
      if(json.success === true){
        localStorage.removeItem('token');
        showAlert(json.message,"success");
        navigate('/login');
        setIsDeleteModal(false);
        setisSettingsModal(false);
      }else{
        showAlert(json.error,"danger");
      }
    }

    //Updating User Info
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [userInfo, setuserInfo] = useState({
          profession: "",
          location: "",
          phone: "",
        });
        const handleInputChange = (e) => {
          setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
        };
      useEffect(() => {
        // Sync userInfo with user's current information
        if (user) {
          setuserInfo({
            profession: user.profession || "",
            location: user.location || "",
            phone: user.phone || "",
          });
        }
      }, [user]);
      const updateInfo = async (req, res)=>{
        const { profession, location, phone } = userInfo;
        const response = await fetch('http://localhost:5000/api/profile/adduserinfo/',{
          method: 'PUT',
          headers:{
            'auth-token':localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profession, location, phone })
        })
        const json = await response.json()
        if(json.success === true){
          showAlert("User Information updated","success");
          setIsModalOpen(false);
          getUserProfile();
        }else{
          showAlert("Not able to update the user info","danger");
        }
      }
  return (
    <>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <div className="is-size-4">Social Mate</div>
          </a>

          <a
            role="button"
            className={`navbar-burger ${isMenuActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isMenuActive}
            data-target="navbarBasicExample"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isMenuActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            {user ? (
              <div className="navbar-item">
                <button
                  className="button is-primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  User Profile
                </button>
                <button
                  className="button is-warning"
                  onClick={() => setIsFriendsModal(true)}
                >
                  Friends
                </button>
                <button
                  className="button is-info"
                  onClick={() => setisSettingsModal(true)}
                >
                  Settings
                </button>
                <button
                  className="button is-danger is-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title is-size-4 has-text-weight-light">
                Update User Info
              </p>
            </header>
            <section className="modal-card-body">
              <div className="columns is-vcentered">
                {" "}
                {/* `columns` creates a flex container for the columns */}
                <div className="column">
                  {" "}
                  <div className="is-flex is-justify-content-space-evenly my-3"><div className="is-size-4 has-text-weight-light">Profession:</div> <div><input
                    className="input is-normal"
                    type="text"
                    placeholder="Enter Profession..."
                    name="profession" value={userInfo.profession}
                    onChange={handleInputChange}
                  /></div></div>
                  
                  <div className="is-flex is-justify-content-space-evenly"><div className="is-size-4 has-text-weight-light">Location:</div> <div><input
                    className="input is-normal"
                    type="text"
                    placeholder="Enter Location..."
                    name="location" value={userInfo.location}
                    onChange={handleInputChange}
                  /></div></div>
                  <div className="is-flex is-justify-content-space-evenly my-3"><div className="is-size-4 has-text-weight-light">Phone: </div> <div><input
                    className="input is-normal"
                    type="text"
                    placeholder="Enter Phone..."
                    name="phone" value={userInfo.phone}
                    onChange={handleInputChange}
                  /></div></div>
                  
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button
                  className="button is-success"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                
                <button
                  className="button is-danger is-outlined"
                  onClick={() => updateInfo()}
                >
                  Save Changes
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
      {isFriendsModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title is-size-4 has-text-weight-light">
                Friends and Friends Requests
              </p>
            </header>
            <section className="modal-card-body">
              <div className="columns is-vcentered">
                {" "}
                {/* `columns` creates a flex container for the columns */}
                <div className="column is-full-mobile is-half-tablet is-half-desktop">
                  {" "}
                  {/* `column` will create each box in its own column, and `is-half` makes each box take up 50% of the width */}
                  <div
                    className="card"
                    style={{ maxHeight: "400px", overflowY: "scroll" }}
                  >
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4 has-text-weight-light">
                            Friends
                          </p>
                        </div>
                      </div>

                      <div className="content">
                        {user.friends.map((friend, index) => (
                          <div
                            key={friend._id || index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <span>{friend.name}</span>
                            <button
                              className="button is-danger is-small"
                              onClick={() => removeFriend(friend._id)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-full-mobile is-half-tablet is-half-desktop">
                  {" "}
                  {/* Same for the second box */}
                  <div
                    className="card"
                    style={{ maxHeight: "400px", overflowY: "scroll" }}
                  >
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4 has-text-weight-light">
                            Friends Requests
                          </p>
                        </div>
                      </div>

                      <div className="content">
                        {user.friendRequests.length === 0 ? (
                          <p>No new friend requests</p>
                        ) : (
                          user.friendRequests.map((friend, index) => (
                            <div
                              key={friend._id || index}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <span>{friend.name}</span>
                              <div>
                                <button
                                  className="button is-success is-small mx-1"
                                  onClick={() => acceptRequest(friend._id)}
                                >
                                  Yes
                                </button>
                                <button
                                  className="button is-danger is-small"
                                  onClick={() => rejectRequest(friend._id)}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button
                  className="button is-danger"
                  onClick={() => setIsFriendsModal(false)}
                >
                  Close
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
      {isSettingsModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title is-size-4 has-text-weight-light">
               Renew Password or Delete Account.
              </p>
            </header>
            <section className="modal-card-body">
              <div className="columns is-vcentered">
                {" "}
                {/* `columns` creates a flex container for the columns */}
                <div className="column">
                  {" "}
                  
                  <div className="is-flex is-justify-content-space-evenly my-3"><div className="is-size-4 has-text-weight-light">Current Password:</div> <div><input
                    className="input is-normal"
                    type="password"
                    placeholder="Enter current password..."
                    name="curPassword" 
                    value={password.curPassword}
                    onChange={handlePasswordChange}
                  /></div></div>
                  
                  <div className="is-flex is-justify-content-space-evenly"><div className="is-size-4 has-text-weight-light">New Password:</div> <div><input
                    className="input is-normal"
                    type="password"
                    placeholder="Enter new password..."
                    name="newPassword" 
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                  /></div></div>
                  <div className="is-flex is-justify-content-space-evenly my-3"><div className="is-size-4 has-text-weight-light">Confirm Password:</div> <div><input
                    className="input is-normal"
                    type="password"
                    placeholder="Confirm new password..."
                    name="cpassword" 
                    value={password.cpassword}
                    onChange={handlePasswordChange}
                  /></div></div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button
                  className="button is-danger"
                  onClick={() => setisSettingsModal(false)}
                >
                  Close
                </button>
                <button
                  className="button is-danger is-light"
                  onClick={resetPassword}
                >
                  Renew Password
                </button>
                <button
                  className="button is-danger is-outlined"
                  onClick={()=>setIsDeleteModal(true)}
                >
                  Delete Account
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
      {isDeleteModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title is-size-4 has-text-weight-light">
                Deleting the account is Irreversible.
              </p>
            </header>
            <section className="modal-card-body">
              <div className="columns is-vcentered">
                {" "}
                {/* `columns` creates a flex container for the columns */}
                <div className="column">
                  {" "}
                  <div className="is-flex is-justify-content-space-evenly my-3"><div className="is-size-4 has-text-weight-light">Password:</div> <div><input
                    className="input is-normal"
                    type="password"
                    placeholder="Enter password..."
                    name="dpassword" value={dpassword} onChange={handleDeleteAccountPassword}
                  /></div></div>
                  
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button
                  className="button is-success"
                  onClick={() => setIsDeleteModal(false)}
                >
                  Go Back
                </button>
                
                <button
                  className="button is-danger is-outlined"
                  onClick={() => deleteAccount()}
                >
                  Delete Account Permanently!
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
