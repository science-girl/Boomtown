module.exports = app => {
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
        return context.loaders.getItem.load(id);
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
      itemowner(item, args, context) {
        return context.loaders.itemowners.load(item.itemowner);
      },
      borrower(item, args, context) {
        if (item.borrower) {
          return context.loaders.borrower.load(item.borrower);
        } else return null;
      },
      tags(item) {
        return item.tags;
      }
    },
    User: {
      shareditems(user, args, context) {
        return context.loaders.sharedItems.load(user.id);
      },
      borroweditems(user, args, context) {
        return context.loaders.borrowedItems.load(user.id);
      }
    }
  };
};
