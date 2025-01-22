import React, { useState } from "react";
import ProfileContext from "./ProfileContext";

const ProfileState = (props) => {
  const host = "http://localhost:5050";

  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState();
  const showAlert = (message, type) => {
    setAlert({message, type});
    setTimeout(()=>setAlert(null),3000);
  }

  const getUserProfile = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.isVerified) {
      setUser(json);
    } else {
      console.log("Error fetching user data");
    }
  };

  const [accInfo, setAccInfo] = useState(null);

  const getAccInfo = async () => {
    const response = await fetch(`${host}/api/accounts/getAccInfo`,{
      method: "GET",
      headers: {
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if(json.success){
      setAccInfo(json);
    }else{
      showAlert("Something went wrong", "danger");
    }
  }

  const [transactions, setTrasactions] = useState(null);
  const getTransactions = async () => {
    const response = await fetch(`${host}/api/transactions/getTransactions`,{
      method:'GET',
      headers:{
        "authToken":localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if(json.success){
      setTrasactions(json.transactions);
    }else{
      showAlert(json.error,"danger");
    }
  }

  const [emp, setEmp] = useState(null);
  const getEmp = async () => {
    const response = await fetch('http://localhost:5050/api/employees/getEmp',{
      method:'GET',
      headers:{
        empAuthToken: localStorage.getItem('empAuthToken')
      },
    });
    const json = await response.json();
    if(json.success){
      setEmp(json.emp);
    }else{
      showAlert(json.error,"danger");
    }
  }
 
  const logoutUser = () => {
    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
      setUser(null);
    }
    if(localStorage.getItem("empAuthToken")){
      localStorage.removeItem("empAuthToken");
      setEmp(null);
    }
    
  };

  return (
    <ProfileContext.Provider
      value={{
        getUserProfile,
        user,
        setUser,
        logoutUser,
        alert,
        showAlert,
        accInfo,
        getAccInfo,
        transactions,
        getTransactions,
        emp,
        getEmp
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
