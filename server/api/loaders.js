const DataLoader = require("dataloader");

// **** 1. Create a DataLoader instance to create a unique cache. ****
// **** 2. Create batch loading functions that accepts an array of keys
// and returns a Promise
// **** 3. Load values from the loader individually
// after .load() is called once with a given key, the resulting value is cached

module.exports = ({
  // destructure so we can just say getUserOwneditems
  postgresResource: { getAllItems, getTags, fetchItems },
  firebaseResource: { getUser }
}) => {
  return {
    getTags: new DataLoader(ids => Promise.all(ids.map(id => getTags(id)))),
    sharedItems: new DataLoader(ids => Promise.all(ids.map(id => getUser(id)))),
    getAllItems: new DataLoader(ids =>
      Promise.all(ids.map(id => getAllItems(id)))
    ),
    getUser: new DataLoader(ids => Promise.all(ids.map(id => getUser(id)))),
    //getUser: new DataLoader(ids => Promise.all(ids.map(id => fetchUsers(id)))),
    getUsers: new DataLoader(ids => Promise.all(ids.map(id => getUser(id)))),
    getItem: new DataLoader(ids => Promise.all(ids.map(id => fetchItems(id)))),
    borrowedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => getBorrowedItems(id)))
    ),
    itemowners: new DataLoader(ids =>
      Promise.all(ids.map(id => fetchUsers(id)))
    ),
    borrower: new DataLoader(ids => Promise.all(ids.map(id => getUser(id))))
  };
};
