import React from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import "./styles.css";
import style from "./styles.js";

const UserCard = ({ bio, fullname, gravatarurl, numBorrowed, numShared }) => {
  return (
    <div className="userCard">
      <Card style={style.card}>
        <div>
          <CardHeader title={fullname} subtitle={bio}>
            Soemthing
          </CardHeader>
          <CardHeader
            avatar={gravatarurl}
            actAsExpander={false}
            showExpandableButton={false}
          >
            Something
          </CardHeader>
        </div>
        <CardText expandable={false}>Number Borrowed: {numBorrowed}</CardText>
        <CardText expandable={false}>Number Shared: {numShared}</CardText>
      </Card>
    </div>
  );
};

export default UserCard;



// <div className="profileHeader">
//   <div className="profileUserName">
//     <h2>{fullname}</h2>
//     <p>{bio}</p>
//   </div>
//   <div className="profileMeta">
//     <div className="shareStats">
//       <span>{numShared}</span> <p>Items Shared</p>
//       <span>{numBorrowed}</span> <p>Items Borrowed</p>
//       <img className="gravatarImage" src={gravatarurl} alt="" />
//     </div>
//   </div>
// </div>
