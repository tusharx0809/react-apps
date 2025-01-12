import React, { useState } from "react";
import ProfileContext from "./ProfileContext";

const ProfileState = (props) => {
  const host = "http://localhost:5050";

  const [user, setUser] = useState(null);

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

  return (
    <ProfileContext.Provider
      value={{
        getUserProfile,
        user,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
