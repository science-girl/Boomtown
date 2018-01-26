// Resolvers help us pull in the database
const fetch = require("node-fetch");
const ITEMS_URL = "http://localhost:3001/items";
const USERS_URL = "http://localhost:3001/users";

// // temp hard coding
// const Items = [
//   {
//     id: "1",
//     title: "Cool Item",
//     imageurl: "www.google.com",
//     description: "Ok.",
//     available: true,
//     borrowerid: "1",
//     ownerid: "2"
//   },
//   {
//     id: "2",
//     title: "Another Cool Item",
//     imageurl: "www.google.com",
//     description: "Nice.",
//     available: false,
//     borrowerid: "2",
//     ownerid: "1"
//   }
// ];
// const Users = [
//   {
//     id: "1",
//     email: "mack@mack.mac",
//     fullname: "Mac Demarco",
//     imageurl: "www.google.com"
//   },
//   {
//     id: "2",
//     email: "mandi@mandi.com",
//     fullname: "Mandi Wise",
//     imageurl: "www.google.com"
//   }
// ];

const resolveFunctions = {
  // RESOLVERS GO HERE
  Query: {
    items() {
      return fetch(ITEMS_URL).then(r => r.json());
    },
    user(root, { id }) {
      return fetch(`${USERS_URL}/${id}`).then(r => r.json());
    },
    users() {
      return fetch(USERS_URL).then(r => r.json());
    },
    //TEST DATA: query {
    //   item(id:2){
    //     title
    //   }
    // }
    item(root, { id }) {
      return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
    }
  },
  Item: {
    itemowner(item) {
      //return Users.find(user => user.id === item.itemowner);
      return fetch(`${USERS_URL}/${item.itemowner}`).then(r => r.json());
    },
    borrower(item) {
      if (item.borrower) {
        return fetch(`${USERS_URL}/${item.borrower}`).then(r => r.json());
      } else return null;
    },
    tags(item) {
      return item.tags;
    }
  },
  User: {
    shareditems(user) {
      return fetch(`${ITEMS_URL}/?itemowner=${user.id}`).then(r => r.json());
    }
  }
};

module.exports = resolveFunctions;
