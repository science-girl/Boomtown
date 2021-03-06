# Boomtown

Boomtown is a React/Redux application designed for users to partake in a sharing economy by listing items online and borrowing items from other users. Users can filter items by selecting tag(s) and view items in a masonry-style layout (resembling Instagram and Pinterest). Users can share items and borrow items from other users in the community.

## Installation

Download the repo, then run:

```bash
cd client && npm install
```

## Configuration

Edit the `server` configuration to set Postgres credentials.
You can also set port values other than the default values.

## Deployment

From inside the `client` directory, run:

```bash
npm start
```

## Built With

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/docs/introduction/)
* [GraphQL](http://graphql.org/)
* [ApolloClient](www.apollographql.com)
* [Express](https://expressjs.com/)
* [Postgres](https://www.postgresql.org/)

## Known Issues

* When a user borrows and is returned to the items page, the item still appears available for borrowing until a manual page refresh. May be due to caching.

## Authors

* **Lindsey Woo** - _Initial work_ - Mandi Wise and Mackenzie Kieran

## Acknowledgments

* Thanks to the RED Team for all their assistance promoting local share economies.

![Boomtown Screenshot](https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/1517711653229-Screen%20Shot%202018-02-01%20at%2011.11.23%20PM.png?alt=media&token=7862c2ad-a53b-4c68-a9d0-7d7f354854ed)
