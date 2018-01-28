const queryFetch = require("./jsonServer");
// Resolvers help us pull in the database
// const fetch = require("node-fetch");
// const ITEMS_URL = "http://localhost:3001/items";
// const USERS_URL = "http://localhost:3001/users";

const resolveFunctions = {
  Query: {
    items() {
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
      return queryFetch.fetchQueryItems("itemowner", user.id);
    },
    borroweditems(user) {
      return queryFetch.fetchQueryItems("borrower", user.id);
    }
  }
};

module.exports = resolveFunctions;
