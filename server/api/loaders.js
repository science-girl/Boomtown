const DataLoader = require("dataloader");
const js = require("./jsonServer");

// **** 1. Create a DataLoader instance to create a unique cache. ****
// **** 2. Create batch loading functions that accepts an array of keys
// and returns a Promise
// **** 3. Load values from the loader individually
// after .load() is called once with a given key, the resulting value is cached

//exports.createLoaders = ids => {
exports = () => {
  return {
    userItems: new DataLoader(ids =>
      Promise.all(ids.map(id => js.getUserOwnedItems(id)))
    )
  };
};

// exports.createLoaders = () => {
//   return {
//     userItems: new DataLoader(ids =>
//       Promise.all(ids.map(id => js.getUserOwnedItems(id)))
//     )
//   };
// };
