import React from "react";
import Posts from "./Posts";


const Profile = () => {
  return (
    <div className="container" style={{marginTop:"60px"}}>
      <div className="columns is-mobile is-tablet">
        
        <div className="column mx-6">
          <Posts />
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
