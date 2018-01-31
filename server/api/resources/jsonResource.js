const fetch = require("node-fetch");

module.exports = app => {
  const ITEMS_URL = `http://localhost:${app.get("JSON_PORT")}/items`;
  const USERS_URL = `http://localhost:${app.get("JSON_PORT")}/users`;
  return {
    // @params id is the value to query
    // @return the items matching the query constructed
    fetchItems: id => {
      return id
        ? fetch(`${ITEMS_URL}/${id}`).then(r => r.json())
        : fetch(`${ITEMS_URL}`).then(r => r.json());
    },

    // @params id is the value to query
    // @return the users matching the query constructed
    fetchUsers: id => {
      console.log("fetchUsers: " + id);
      return id
        ? fetch(`${USERS_URL}/${id}`).then(r => r.json())
        : fetch(`${USERS_URL}`).then(r => r.json());
    },

    // @param paramValue is the itemowner id to query
    // @return items belonging to the id provided
    getUserOwnedItems: paramValue => {
      return fetch(`${ITEMS_URL}/?itemowner=${paramValue}`).then(r => r.json());
    },

    // @param paramValue is the borrower id to query
    // @return items borrowed by the given id
    getBorrowedItems: paramValue => {
      return fetch(`${ITEMS_URL}/?borrower=${paramValue}`).then(r => r.json());
    }
  };
};
