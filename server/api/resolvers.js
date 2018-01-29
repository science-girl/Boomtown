const queryFetch = require("./jsonServer");
const loaders = require("./loaders");
const DataLoader = require("dataloader");

const resolveFunctions = {
  Query: {
    items() {
      console.log("querying items");
      return queryFetch.fetchItems();
    },
    user(root, { id }) {
      return queryFetch.fetchUsers(id);
    },
    users() {
      return queryFetch.fetchUsers();
    },
    item(root, { id }) {
      return queryFetch.fetchItems(id);
    },
    itemsByTags(root, { tag }) {
      console.log(tag);
      return queryFetch.fetchQueryItems("tag.title", tag);
    }
  },
  Mutation: {
    // Destructuring an inner object; nested destructuring
    // addItem(root, {newItem: {title}}){
    //   return {title};
    // }
    addItem(root, payload) {
      //TODO: save this new item to the db
      //TODO: must return new item thanks to our mutation schema
      return {
        title: payload.newItem.title,
        description: payload.newItem.description
      };
    },
    updateItem(root, payload) {
      //console.log(payload.newItem.borrower);
      return {
        id: payload.newItem.id,
        //borrower: payload.newItem.borrower,
        title: payload.newItem.title
      };
    }
  },
  Item: {
    itemowner(item) {
      return queryFetch.fetchUsers(item.itemowner);
    },
    borrower(item) {
      if (item.borrower) {
        return queryFetch.fetchUsers(item.borrower);
      } else return null;
    },
    tags(item) {
      return item.tags;
    }
  },
  User: {
    shareditems(user) {
      return new DataLoader(ids =>
        Promise.all(ids.map(id => queryFetch.getUserOwnedItems(id)))
      ).load(user.id);
      //return queryFetch.fetchQueryItems("itemowner", user.id);
    },
    borroweditems(user) {
      return queryFetch.fetchQueryItems("borrower", user.id);
    }
  }
};

module.exports = resolveFunctions;
