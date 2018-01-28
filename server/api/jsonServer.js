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

// @params paramName is the name of the field to query and paramValue is the
// value to query on
// @return the users matching the query constructed
exports.fetchQueryUsers = (paramName, paramValue) => {
  return fetch(`${USERS_URL}/?${paramName}=${paramValue}`).then(r => r.json());
};
