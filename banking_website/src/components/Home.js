import React, { useContext, useEffect, useState } from "react";
import profileContext from "../context/Profile/ProfileContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { getUserProfile, user, alert, showAlert, accInfo, getAccInfo } =
    useContext(profileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getUserProfile();
    getAccInfo();
    //eslint-disable-next-line
  }, []);

  const [IsTransferModal, setIsTransferModalOpen] = useState(false);
  const [accounts, setAccounts] = useState({
    from: "",
    to: "",
    amount: "",
  });

  const handleChange = (e) => {
    setAccounts({
      ...accounts,
      [e.target.name]: e.target.value,
    });
  };
  const transferFunds = async () => {
    const amount = parseFloat(accounts.amount);

    if (accounts.from === accounts.to) {
      showAlert("Cannot transfer to same account! Try Again!", "danger");
      setIsTransferModalOpen(false);
      return;
    }
    if (accounts.from === "Checquings") {
      const response = await fetch(
        "http://localhost:5050/api/accounts/cheqToSav",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            amount: amount,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        setIsTransferModalOpen(false);
        getAccInfo();
        showAlert(json.message, "success");
      } else {
        showAlert(json.error, "danger");
      }
    } else {
      const response = await fetch(
        "http://localhost:5050/api/accounts/savToCheq",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            amount: amount,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        setIsTransferModalOpen(false);
        getAccInfo();
        showAlert(json.message, "success");
      } else {
        showAlert(json.error, "danger");
      }
    }
  };

  const [receiverDetails, setReceiverDetails] = useState({
    receiverAmount:"",
    email:""
  })
  const [IsReceiver, IsReceiverModal] = useState(false);
  const handleReceiverChange = (e) => {
    setReceiverDetails({
      ...receiverDetails,
      [e.target.name]: e.target.value,
    })
  }

  const sendMoney = async () => {
    const recAmount = parseFloat(receiverDetails.receiverAmount);
    const response = await fetch('http://localhost:5050/api/transfer/transferFunds',{
      method:'PUT',
      headers:{
        "Content-Type":"application/json",
        "authToken":localStorage.getItem("token"),
      },
      body: JSON.stringify({
        amount: recAmount,
        receiverMail: receiverDetails.email,
      }),
    });
    const json = await response.json();
    if(json.success){
      IsReceiverModal(false);
      getAccInfo();
      showAlert(json.message, "success");
    }else{
      showAlert(json.error,"danger");
    }
  }


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
                        <div className="accordion-body">
                          <i className="fa-solid fa-indian-rupee-sign fa-sm" />{" "}
                          {accInfo?.cheqAcc?.amount}
                        </div>
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
                        <div className="accordion-body">
                          <i className="fa-solid fa-indian-rupee-sign fa-sm" />{" "}
                          {accInfo?.savAcc?.amount}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex flex-column">
                    <div className="mx-3 my-2"> 
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={() => setIsTransferModalOpen(true)}
                      >
                        Transfer&#8594;
                      </button>
                      
                    </div>
                    <div className="mx-3 my-2">
                      <button
                        className="btn btn-success btn-lg"
                        onClick={() => IsReceiverModal(true)}
                      >
                        Send&#8594;
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {IsTransferModal && (
        <>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal */}
          <div
            className="modal show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Transfer Funds</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsTransferModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-around">
                    <p className="fs-4 text fw-light my-2">From</p>
                    <select
                      className="form-select mx-3"
                      aria-label="Default select example"
                      name="from"
                      value={accounts.from}
                      onChange={handleChange}
                    >
                      <option>Checquings</option>
                      <option>Savings</option>
                    </select>
                    <p className="fs-4 text fw-light my-2">To</p>
                    <select
                      className="form-select mx-3"
                      aria-label="Default select example"
                      name="to"
                      value={accounts.to}
                      onChange={handleChange}
                    >
                      <option>Checquings</option>
                      <option>Savings</option>
                    </select>
                  </div>
                  <input
                    className="form-control my-3"
                    type="text"
                    min="0"
                    step="0.01"
                    name="amount"
                    value={accounts.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount..."
                    aria-label="default input example"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsTransferModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={transferFunds}
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
{IsReceiver && (
        <>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal */}
          <div
            className="modal show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Send Money</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => IsReceiverModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  
                  <input
                    className="form-control my-3"
                    type="text"
                    min="0"
                    step="0.01"
                    name="receiverAmount"
                    value={receiverDetails.receiverAmount}
                    onChange={handleReceiverChange}
                    placeholder="Enter Amount..."
                    aria-label="default input example"
                  />
                  <input
                    className="form-control my-3"
                    type="email"
                    min="0"
                    step="0.01"
                    name="email"
                    value={receiverDetails.email}
                    onChange={handleReceiverChange}
                    placeholder="Enter email..."
                    aria-label="default input example"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => IsReceiverModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={sendMoney}
                  >
                    Send Money
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
