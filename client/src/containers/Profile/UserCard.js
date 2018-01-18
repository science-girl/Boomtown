import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const UserCard = props => {
  return (
    <div>
      <Card>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="images/ok-128.jpg"
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText expandable={false}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis
          pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate
          interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    </div>
  );
};

export default UserCard;
