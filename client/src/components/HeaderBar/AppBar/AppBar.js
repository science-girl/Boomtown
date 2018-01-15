import React from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Filter from "./FilterSelection";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import image from "../../../images/boomtown-logo.svg";
import style from "./styles.js";

// largely copy and pasted from material-ui

const AppsBar = ({ match, history }) => (
  <AppBar
    style={style.NavigationBar}
    iconElementLeft={
      <img
        style={style.imageLogo}
        src={image}
        alt="boomtown icon"
        onClick={() => history.push("/")}
      />
    }
    title={
      <div style={style.filterWrapper}>
        <Filter />
      </div>
    }
    iconElementRight={
      <span>
        <RaisedButton
          label="My Profile"
          primary={true}
          onClick={() => history.push("/profile")}
        />{" "}
        <RaisedButton
          label="Logout"
          secondary={true}
          onClick={() => history.push("/login")}
        />
      </span>
    }
  />
);

AppsBar.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(AppsBar);
