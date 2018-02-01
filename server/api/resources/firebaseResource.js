const firebase = require("firebase");
require("firebase/auth");

module.exports = app => {
  const firebaseApp = firebase.initializeApp(app.get("FIREBASE_CONFIG"));
  const db = firebase.database();
  const auth = firebaseApp.auth;

  return {
    async fetchUsers() {
      let users = await db.ref("users").once("value");
      users = users.val();
      const userList = [];
      for (userid in users) {
        userList.push({
          id: userid,
          bio: users[userid].bio,
          email: users[userid].email,
          fullname: users[userid].fullname,
          imageurl: users[userid].imageurl
        });
      }
      return userList;
    },

    async getUser(userid) {
      let user = await db.ref(`users/${userid}`).once("value");
      user = user.val();
      console.log(user);
      return {
        id: userid,
        ...user
      };
    }
    //   return new Promise((resolve, reject) => {
    //     db
    //       .ref(`/users/${userid}`)
    //       .once("value")
    //       .then(function(snapshot) {
    //         console.log(snapshot.val());
    //         resolve(snapshot.val());
    //       });
    //   });
    // }
  };
};
