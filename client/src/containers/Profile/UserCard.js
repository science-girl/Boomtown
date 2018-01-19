import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const UserCard = ({ bio, fullname, gravatarurl, numBorrowed, numOwned }) => {
  return (
    <div>
      <Card>
        <CardHeader
          avatar={gravatarurl}
          title={fullname}
          subtitle={bio}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText expandable={false}>Number Borrowed: {numBorrowed}</CardText>
        <CardText expandable={false}>Number Owned: {numOwned}</CardText>
      </Card>
    </div>
  );
};

export default UserCard;
