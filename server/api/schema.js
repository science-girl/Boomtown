module.exports = `type Tag{
    id: ID
    title: String
  }
  type User{
    id: ID
    email: String
    fullname: String
    bio: String
    imageurl: String
    shareditems: [Item]
    borroweditems: [Item]
  }
  type Item {
    id: ID
    title: String
    itemowner: User
    borrower: User
    imageurl: String
    description: String
    available: Boolean
    created: String
    tags: [Tag]
  }

  input TagInput{
    id: ID
    title: String
  }

  input AddItemInput{
    imageurl: String
    title: String
    itemowner: ID
    description: String
    tags: [TagInput]
  }

  input UpdateItemInput{
    id: ID
    borrower: ID
  }

  # POST (Get, Put, Delete) request
  # Add Item, Set Item to borrow
  type Mutation{
    # need to be explicit that this is an input
    addItem(newItem: AddItemInput): Item
    updateItem(newItem: UpdateItemInput ): Item
  }
  type Query{
    items: [Item]
    fetchItems: [Item]
    itemsByTags: [Item]
    item(id:ID): Item
    users: [User]
    user(id:ID): User
    getTagMenu: [Tag]
  }

`;
