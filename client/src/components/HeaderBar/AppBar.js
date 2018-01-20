import React from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import FilterContainer from "../Filter/FilterSelection";
import { Route, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Profile from "../../containers/Profile/ProfileContainer";
import image from "../../images/boomtown-logo.svg";
import style from "./styles.js";
import styles from "./styles.css";

// largely copy and pasted from material-ui

const AppsBar = ({ match, history }) => (
  <AppBar
    style={style.NavigationBar}
    iconElementLeft={
      <img
        style={style.imageLogo}
        src={image}
        alt="boomtown icon"
        onClick={() => history.push("/items")}
      />
    }
    title={
      <div style={style.filterWrapper}>
        <Route exact path="/items" component={FilterContainer} />
      </div>
    }
    iconElementRight={
      <div className="headerButtonWrapper">
        <div>
          <Link to={`/profile/eEvh1WUF5nb5eeUksUQb3Ph0kOU2`}>
            <RaisedButton label="My Profile" primary={true} />
          </Link>{" "}
          <RaisedButton
            label="Logout"
            secondary={true}
            onClick={() => history.push("/login")}
          />
        </div>
      </div>
    }
  />
);

AppsBar.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(AppsBar);
