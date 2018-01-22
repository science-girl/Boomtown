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

// TODO: remove dummy data once oath is in place
const LOGGED_IN_USER = "eEvh1WUF5nb5eeUksUQb3Ph0kOU2";

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
    <CardTitle title={item.title} subtitle={`${item.tags}`} />
    <CardText>{item.description}</CardText>
    {/*Only show the 'Borrow' button when not on the logged in user's profile page
    Only show the 'Borrow' button when the item hasn't been loaned */}
    {item.borrower === null &&
      item.itemowner.id !== LOGGED_IN_USER && (
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
  item: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired
};

export default ItemCard;
