import React from "react";
import Paper from "material-ui/Paper";
import "./style.css";

const styles = {
  paper: {
    height: 244,
    width: 800,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "40px"
  }
};

const UserCard = ({ bio, fullname, gravatarurl, numBorrowed, numShared }) => {
  return (
    <Paper style={styles.paper} zDepth={5}>
      <div className="user-card">
        <div className="user-info">
          <h2>{fullname}</h2>
          <p>{bio}</p>
        </div>
        <div className="user-stats">
          <span>{numShared}</span> <p>Items Shared</p>
          <span>{numBorrowed}</span> <p>Items Borrowed</p>
        </div>
        <div className="user-image">
          <img src={gravatarurl} alt="Boomtown Sharing is Caring" />
        </div>
      </div>
    </Paper>
  );
};

export default UserCard;
