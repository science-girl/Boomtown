import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import PropTypes from "prop-types";

import { fetchItemsAndUsers, getItemTags } from "../../redux/modules/items";
import Items from "./Items";
import style from "./styles.js";

class ItemsContainer extends Component {
  // propTypes convention for classes
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers());
  }

  //
  // @param list of item objects, hashMap of tags
  // @return a list of items matching the given tags or
  // the original list if no tags are supplied.
  filterTags(list, tags) {
    // check if the tag list is empty; if it is, return the list.
    if (tags.length === 0) {
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

  render() {
    return this.props.isLoading ? (
      <div className="loading">
        <CircularProgress
          size={80}
          thickness={5}
          // {/*color={theme.palette.multicolor}*/}
        />
      </div>
    ) : (
      <Items list={this.filterTags(this.props.items, this.props.tagList)} />
    );
  }
}

// Convention is to name mapStateToProps
// retrieve the state from the store and plug it into props for react
const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  tagList: state.items.tagList,
  error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);
