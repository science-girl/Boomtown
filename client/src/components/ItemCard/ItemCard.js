import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
const ItemCard = ({ item, owner }) => (
  <Card>
    <CardMedia>
      <img src={item.imageurl} alt="" />
    </CardMedia>
    {item.borrower !== null && (
      <CardMedia
        overlayContentStyle={style.CardText}
        overlay={<CardTitle subtitle={item.borrower} />}
      />
    )}
    <Link to={`/profile/${owner}`}>
      <CardHeader
        title={item.itemowner.fullname}
        subtitle={moment(item.created).fromNow()}
        avatar={item.itemowner.gravatarurl}
      />
    </Link>
    <CardTitle title={item.title} subtitle={item.tags} />
    <CardText>{item.description}</CardText>
    {/*Only show the 'Borrow' button when not on the current user's profile page
    Only show the 'Borrow' button when the item hasn't been loaned */}
    {item.borrower === null &&
      item.itemowner.id !== owner && (
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
