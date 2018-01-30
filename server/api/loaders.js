const DataLoader = require("dataloader");
const js = require("./jsonServer");

// **** 1. Create a DataLoader instance to create a unique cache. ****
// **** 2. Create batch loading functions that accepts an array of keys
// and returns a Promise
// **** 3. Load values from the loader individually
// after .load() is called once with a given key, the resulting value is cached

function createLoaders(app) {
  const ITEMS_URL = `http://localhost:${app.get("JSON_PORT")}/items`;
  const USERS_URL = `http://localhost:${app.get("JSON_PORT")}/users`;

  return {
    sharedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => js.getUserOwnedItems(id, ITEMS_URL)))
    ),
    getAllItems: new DataLoader(ids =>
      Promise.all(ids.map(id => js.getAllItems(id, ITEMS_URL)))
    ),
    getUser: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id, USERS_URL)))
    ),
    getUsers: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id, USERS_URL)))
    ),
    getItem: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchItems(id, ITEMS_URL)))
    ),
    borrowedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => js.getBorrowedItems(id, ITEMS_URL)))
    ),
    itemowners: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id, USERS_URL)))
    ),
    borrower: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id, USERS_URL)))
    )
  };
}

module.exports = createLoaders;
