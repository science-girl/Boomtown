const DataLoader = require("dataloader");
const js = require("./jsonServer");

// **** 1. Create a DataLoader instance to create a unique cache. ****
// **** 2. Create batch loading functions that accepts an array of keys
// and returns a Promise
// **** 3. Load values from the loader individually
// after .load() is called once with a given key, the resulting value is cached

function createLoaders() {
  return {
    sharedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => js.getUserOwnedItems(id)))
    ),
    getAllItems: new DataLoader(ids =>
      Promise.all(ids.map(id => js.getAllItems(id)))
    ),
    getUser: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id)))
    ),
    getUsers: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id)))
    ),
    getItem: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchItems(id)))
    ),
    borrowedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => js.getBorrowedItems(id)))
    ),
    itemowners: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id)))
    ),
    borrower: new DataLoader(ids =>
      Promise.all(ids.map(id => js.fetchUsers(id)))
    )
  };
}

module.exports = createLoaders;
