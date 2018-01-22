import React from "react";
import "./styles.css";

const UserCard = ({ bio, fullname, gravatarurl, numBorrowed, numShared }) => {
  return (
    <div className="white-box">
      <div className="user-card">
        <div className="user-info">
          <h2>{fullname}</h2>
          <p>{bio}</p>
        </div>
        <div className="user-stats">
          <div className="borrow-owned">
            <span>{numShared}</span> <p>Items Shared</p>
            <span>{numBorrowed}</span> <p>Items Borrowed</p>
          </div>
          <div className="user-image">
            <img src={gravatarurl} alt="Boomtown Sharing is Caring" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
