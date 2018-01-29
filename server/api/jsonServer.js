// Resolvers help us pull in the database
const fetch = require("node-fetch");
const ITEMS_URL = "http://localhost:3001/items";
const USERS_URL = "http://localhost:3001/users";

// @params id is the value to query
// @return the items matching the query constructed
exports.fetchItems = id => {
  return id
    ? fetch(`${ITEMS_URL}/${id}`).then(r => r.json())
    : fetch(`${ITEMS_URL}`).then(r => r.json());
};

// @params id is the value to query
// @return the users matching the query constructed
exports.fetchUsers = id => {
  return id
    ? fetch(`${USERS_URL}/${id}`).then(r => r.json())
    : fetch(USERS_URL).then(r => r.json());
};

// @params paramName is the name of the field to query and paramValue is the
// value to query on
// @return the items matching the query constructed
exports.fetchQueryItems = (paramName, paramValue) => {
  return fetch(`${ITEMS_URL}/?${paramName}=${paramValue}`).then(r => r.json());
};

exports.fetchQueryTagItems = tags => {
  // filter out only the items that match the given tags
  return tags
    ? fetch(`${ITEMS_URL}`)
        .filter(item => hasTags(item, tags))
        .then(r => r.json())
    : fetch(`${ITEMS_URL}`).then(r => r.json());
};

exports.getUserOwnedItems = paramValue => {
  console.log(paramValue);
  //return Items.find(item => paramValue === item.itemowner);
  return fetch(`${ITEMS_URL}/?itemowner=${paramValue}`).then(r => r.json());
};

// @params paramName is the name of the field to query and paramValue is the
// value to query on
// @return the users matching the query constructed
exports.fetchQueryUsers = (paramName, paramValue) => {
  return fetch(`${USERS_URL}/?${paramName}=${paramValue}`).then(r => r.json());
};

//
// @param an item and an array of tags to match the item
// @return the item once one of the item tags matches one of the tags in matchTags
function hasTags(item, matchTags) {
  if (matchTags == 0) {
    return item;
  }
  for (let i = 0; i < item.tags.length; i += 1) {
    // console.log(item.tags[i]);
    if (matchTags.some(tag => tag === item.tags[i])) {
      return item;
    }
  }
}
