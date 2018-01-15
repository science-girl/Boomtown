import React, { Component } from "react";

import Items from "./Items";

const JSON_ITEM_DB = "http://localhost:3001/items";
const JSON_USER_DB = "http://localhost:3001/users";
const GRAVATAR_URL = "http://gravatar.com/avatar/";
const md5 = require("md5");

export default class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      items: [],
      users: [],
      currentView: []
    };
  }

  //
  // @param list of item objects, hashMap of tags
  // @return a list of items matching the given tags or
  // the original list if no tags are supplied.
  filterTags(list, tags) {
    // check if the tag list is empty; if it is, return the list.
    if (tags.length <= 0) {
      return list;
    }
    // otherwise curate a list composed of items matching tags in tags
    // in the case of multiple tags, an item is added to the list once a
    // matching tag has been found.
    return list.filter(item => {
      if (this.hasTag(item.tags, tags)) {
        return item;
      }
    });
  }

  //
  // @param an array of item tags and an array of tags to match the item
  // @return true once one of the item tags matches one of the tags in matchTags
  // false if there is no match.
  hasTag(itemTags, matchTags) {
    for (let i = 0; i < itemTags.length; i++) {
      for (let j = 0; j < matchTags.length; j++) {
        if (itemTags[i] === matchTags[j]) {
          return true;
          break;
        }
      }
    }
    return false;
  }

  componentWillMount() {
    console.log("loading...");
    this.setState((this.loading: true));
  }

  componentDidMount() {
    console.log("fetching JSON");

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

      const combined = this.state.items.map(item => {
        let ownerKey = item.itemowner;
        item.itemowner = userHashTable[ownerKey];
        if (item.borrower !== null && item !== undefined) {
          item.borrower = userHashTable[item.borrower].fullname;
        }
        return item;
      });

      this.setState({
        items: combined,
        loading: false,
        currentView: combined
      });
    });
  }

  render() {
    return !this.loading ? (
      <Items list={this.state.currentView} />
    ) : (
      <div>Loading...</div>
    );
  }
}
