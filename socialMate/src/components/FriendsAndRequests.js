import React, { useContext } from "react";
import profileContext from "../context/profile/ProfileContext";


const FriendsAndRequests = () => {
  const context = useContext(profileContext);
  const { getUserProfile, user } = context;
  
  //Handling FriendsRequests
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
      alert("Friend removed from Friend List");
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
      alert("Friend Added");
      getUserProfile();
    } else {
      alert("Not Added");
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
      alert("Friend Request Rejected");
      getUserProfile();
    } else {
      alert("Something went wrong, Please Reload!");
    }
  };

  return (
    <div>friends</div>
  );
};

export default FriendsAndRequests;