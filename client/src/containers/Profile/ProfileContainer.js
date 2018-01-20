import React, { Component } from "react";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchItemsAndUsers } from "../../redux/modules/profile";
import Profile from "./Profile.js";
import UserCard from "./UserCard";
import style from "./styles.js";
import styles from "./styles.css";

class ProfileContainer extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers(this.props));
  }

  render() {
    return this.props.isLoading ? (
      <div className="loading">
        <CircularProgress size={80} thickness={5} />
      </div>
    ) : (
      <div className="profileHeader">
        <UserCard
          bio={this.props.profile.bio}
          fullname={this.props.profile.fullname}
          gravatarurl={this.props.profile.gravatarurl}
          numBorrowed={this.props.profile.numBorrowedItems}
          numShared={this.props.profile.numSharedItems}
        />
        <Profile list={this.props.items} />
      </div>
    );
  }
}

// retrieve the state from the store and plug it into props for react
const mapStateToProps = state => ({
  isLoading: state.profile.isLoading,
  items: state.profile.items,
  profile: state.profile.profile,
  error: state.profile.error
});

export default connect(mapStateToProps)(ProfileContainer);
