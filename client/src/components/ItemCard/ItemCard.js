import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import style from "./styles.js";

// largely copy and pasted code from Material-UI site
const ItemCard = ({ item }) => (
  <Card>
    <CardMedia>
      <img src={item.imageurl} alt="" />
    </CardMedia>
    (/*Only show the overlay when the item has a borrower */}
    {item.borrower !== null && (
      <CardMedia
        overlay={
          <CardTitle style={style.LentText}>Lent to {item.borrower}</CardTitle>
        }
      />
    )}
    <CardHeader
      title={item.itemowner.fullname}
      subtitle={moment(item.created).fromNow()}
      avatar={item.itemowner.gravatarurl}
    />
    <CardTitle title={item.title} subtitle={item.tags} />
    <CardText>{item.description}</CardText>
    {/* Only show the 'Borrow' button when the item hasn't been loaned */}
    {item.borrower === null && (
      <CardActions>
        <RaisedButton
          backgroundColor="#263238"
          labelColor="white"
          label="Borrow"
        />
      </CardActions>
    )}
  </Card>
);

ItemCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemCard;
