module.exports = ({
  postgresResource: {
    getItem,
    getUserOwnedItems,
    getBorrowedItems,
    addItem,
    updateItem
  },
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
      item(id) {
        return getItem(id);
      },
      getTagMenu(root, args, context) {
        return context.loaders.getTagMenu.load(args);
      }
    },
    Mutation: {
      addItem(root, { newItem }) {
        return addItem(newItem);
      },
      updateItem(root, { newItem }) {
        return updateItem(newItem);
      }
    },
    Item: {
      itemowner(item) {
        return getUser(item.itemowner);
      },
      borrower(item) {
        if (item.borrower) {
          return getUser(item.borrower);
        } else return null;
      },
      tags({ id }, args, context) {
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
