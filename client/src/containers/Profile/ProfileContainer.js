import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchItemsAndUsers } from "../../redux/modules/profile";
import Profile from "./Profile.js";
import UserCard from "../../components/UserCard/UserCard";
import ShareButton from "../../components/Buttons/ShareButton.js";
import { Loading } from "../../components/Loading/Loading";
import "./styles.css";
import style from "./styles.js";

class ProfileContainer extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers(this.props));
  }

  render() {
    return this.props.isLoading ? (
      <Loading />
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
        <div style={style.FixedButton}>
          <ShareButton />
        </div>
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
