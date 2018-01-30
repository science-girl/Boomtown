// Resolvers help us pull in the database
const fetch = require("node-fetch");
// const ITEMS_URL = "http://localhost:3001/items";
// const USERS_URL = "http://localhost:3001/users";

// @params id is the value to query
// @return the items matching the query constructed
exports.fetchItems = (id, URL) => {
  return id
    ? fetch(`${URL}/${id}`).then(r => r.json())
    : fetch(`${URL}`).then(r => r.json());
};

// @params id is the value to query
// @return the users matching the query constructed
exports.fetchUsers = (id, URL) => {
  return id
    ? fetch(`${URL}/${id}`).then(r => r.json())
    : fetch(`${URL}`).then(r => r.json());
};

// @param paramValue is the itemowner id to query
// @return items belonging to the id provided
exports.getUserOwnedItems = (paramValue, URL) => {
  return fetch(`${URL}/?itemowner=${paramValue}`).then(r => r.json());
};

// @param paramValue is the borrower id to query
// @return items borrowed by the given id
exports.getBorrowedItems = (paramValue, URL) => {
  return fetch(`${URL}/?borrower=${paramValue}`).then(r => r.json());
};

// @param paramValue is an argument passed so that the DataLoader doesn't choke
// @return all items
exports.getAllItems = (paramValue, URL) => {
  return fetch(`${URL}`).then(r => r.json());
};
