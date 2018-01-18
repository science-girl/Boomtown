import React, { Component } from "react";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router-dom";

import Profile from "./Profile.js";
import UserCard from "./UserCard";
import style from "./styles.js";
import styles from "./styles.js";

const JSON_ITEM_DB = "http://localhost:3001/items";
const JSON_USER_DB = "http://localhost:3001/users";
const GRAVATAR_URL = "http://gravatar.com/avatar/";
const md5 = require("md5");

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      users: {},
      isLoading: true,
      currentView: {},
      userInfo: {}
    };
  }

  componentDidMount() {
    // Fetch JSON and attach to state
    // Use AJAX to get JSON items from the JSON db
    const items = fetch(JSON_ITEM_DB).then(r => r.json());
    const users = fetch(JSON_USER_DB).then(r => r.json());

    // Merge the two lists together into a single list
    // Attach the new list to state, and apss that list into the ITems component
    Promise.all([items, users]).then(response => {
      this.setState({ items: response[0], users: response[1] });

      let userHashTable = {};
      for (let index = 0; index < this.state.users.length; index++) {
        // create a md5 hash to access gravatar info
        const gravatarUrl = GRAVATAR_URL.concat(
          md5(this.state.users[index].email)
        );

        // set user data in a hashmap
        userHashTable[this.state.users[index].id] = {
          id: this.state.users[index].id,
          email: this.state.users[index].email,
          fullname: this.state.users[index].fullname,
          gravatarurl: gravatarUrl
        };
      }

      let combined = this.state.items.map(item => {
        let ownerKey = item.itemowner;
        item.itemowner = userHashTable[ownerKey];
        if (item.borrower !== null && item !== undefined) {
          item.borrower = userHashTable[item.borrower].fullname;
        }
        return item;
      });

      // get the userId from the URL:
      let url = this.props.match.url;
      url = url.substr(url.lastIndexOf("/") + 1, url.length);

      const profileItems = combined.filter(item => {
        // if item.itemowner.id matches given userId, include it in the lists
        if (item.itemowner.id === url) return item;
      });

      this.setState({
        items: profileItems,
        currentView: profileItems,
        isLoading: combined.length < 0
      });
    });
  }

  render() {
    return this.state.isLoading ? (
      <div className="loading">
        <CircularProgress size={80} thickness={5} />
      </div>
    ) : (
      <div className="profileHeader">
        <UserCard />
        <Profile list={this.state.currentView} />
      </div>
    );
  }
}
