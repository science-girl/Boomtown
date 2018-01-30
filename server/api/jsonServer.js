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

// @param paramValue is the itemowner id to query
// @return items belonging to the id provided
exports.getUserOwnedItems = paramValue => {
  return fetch(`${ITEMS_URL}/?itemowner=${paramValue}`).then(r => r.json());
};

// @param paramValue is the borrower id to query
// @return items borrowed by the given id
exports.getBorrowedItems = paramValue => {
  return fetch(`${ITEMS_URL}/?borrower=${paramValue}`).then(r => r.json());
};

// @param paramValue is an argument passed so that the DataLoader doesn't choke
// @return all items
exports.getAllItems = paramValue => {
  return fetch(`${ITEMS_URL}`).then(r => r.json());
};
