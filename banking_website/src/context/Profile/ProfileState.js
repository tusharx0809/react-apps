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
    const json = response.json();
    if(json.success){
      setTrasactions(json);
    }else{
      showAlert(json.error);
    }
  }

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
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
        getAccInfo
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
