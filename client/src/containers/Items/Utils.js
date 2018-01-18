import React from "react";

const JSON_ITEM_DB = "http://localhost:3001/items";
const JSON_USER_DB = "http://localhost:3001/users";
const GRAVATAR_URL = "http://gravatar.com/avatar/";
const md5 = require("md5");

//
// @return: returns User data as an array of objects
export function fetchItemData() {
  return fetchData(JSON_ITEM_DB);
}

//
// @return: returns User data as an array of objects
export function fetchUserData() {
  return fetchData(JSON_USER_DB);
}

//
// @param: JSON database location
// @return: data extracted from JSON database as an array of objects
function fetchData(DataType) {
  // Fetch JSON from the appropriate JSON db
  const data = fetch(DataType).then(r => r.json());
  //let completeData = {};
  Promise.all([data]).then(response => {
    console.log(response[0]);
    return { ...response[0] };
  });
}

//
// @param list of item objects, hashMap of tags
// @return a list of items matching the given tags or
// the original list if no tags are supplied.
export function filterTags(list, tags) {
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
function hasTag(itemTags, matchTags) {
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
