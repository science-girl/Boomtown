// TODO: tags and items are the only thing to DataLoader
// UN Data Load the others and get directly from jsonResource
module.exports = ({
  postgresResource: { getItem, getUserOwnedItems, getBorrowedItems },
  //  js: { getUserOwnedItems /*, fetchUsers, getTags*/ },
  firebaseResource: { fetchUsers, getUser }
}) => {
  return {
    Query: {
      items(root, args, context) {
        return context.loaders.getAllItems.load(args);
      },
      user(root, { id }, context) {
        return context.loaders.getUser.load(id);
      },
      users(root, { arg }, context) {
        return context.loaders.getUsers.load(arg);
      },
      item(root, { id }, context) {
        return getItem(id);
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
        console.log(item);
        return getUser(item.itemowner);
      },
      borrower(item) {
        if (item.borrower) {
          return getUser(item.borrower);
        } else return null;
      },
      tags({ id }, args, context) {
        console.log("tag item id: " + id);
        return context.loaders.getTags.load(id);
      }
    },
    User: {
      shareditems(user) {
        return getUserOwnedItems(user.id);
      },
      borroweditems(user) {
        return getBorrowedItems(user.id);
      }
    }
  };
};
