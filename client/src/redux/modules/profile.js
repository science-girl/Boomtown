const GET_PROFILE_LOADING = "GET_PROFILE_LOADING";
const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";

const JSON_ITEM_DB = "http://localhost:3001/items";
const JSON_USER_DB = "http://localhost:3001/users";
const GRAVATAR_URL = "http://gravatar.com/avatar/";
const md5 = require("md5");

// ACTION TYPES
const getProfileLoading = () => ({ type: "GET_PROFILE_LOADING" });
const getProfileSuccess = (items, profile) => ({
  type: "GET_PROFILE_SUCCESS",
  items: items,
  profile: profile
});

const getProfileError = errorMessage => ({
  type: "GET_PROFILE_ERROR",
  payload: errorMessage
});

// ASYNCH ACTION CREATOR
// curried (partially applied) function that accepts dispatch as a parameter
//
export const fetchItemsAndUsers = props => dispatch => {
  // get the loader spinning
  dispatch(getProfileLoading());
  //
  // LOGIC for extracting the items belonging to the userId in the url
  // get the userId from the URL:
  let url = props.match.url;
  url = url.substr(url.lastIndexOf("/") + 1, url.length);

  // Fetch JSON and attach to state
  // Use AJAX to get JSON items from the JSON db

  // user a query string to only fetch the items that match
  // the given itemowner
  const QUERY_STRING = `${JSON_ITEM_DB}?itemowner=${url}`;
  // for number borrowed:
  // - use query string to access db for items where this userId matches borrower
  // - count the number of items returned
  const BORROW_QUERY_STRING = `${JSON_ITEM_DB}?borrower=${url}`;
  const items = fetch(QUERY_STRING).then(r => r.json());
  const users = fetch(JSON_USER_DB).then(r => r.json());

  // for the given user, add:
  // - number of items borrowed
  // - number of items owned
  const borrowedItems = fetch(BORROW_QUERY_STRING).then(r => r.json());

  // Merge the two lists together into a single list
  // Attach the new list to state, and apss that list into the ITems component
  Promise.all([items, users, borrowedItems])
    .then(response => {
      const [items, users, borrowedItems] = response;

      let userHashTable = {};
      for (let index = 0; index < users.length; index++) {
        // create a md5 hash to access gravatar info
        const gravatarUrl = GRAVATAR_URL.concat(md5(users[index].email));

        // set user data in a hashmap
        userHashTable[users[index].id] = {
          id: users[index].id,
          email: users[index].email,
          fullname: users[index].fullname,
          bio: users[index].bio,
          gravatarurl: gravatarUrl
        };
      }

      let combined = items.map(item => {
        let ownerKey = item.itemowner;
        item.itemowner = userHashTable[ownerKey];
        if (item.borrower !== null && item !== undefined) {
          item.borrower =
            item.borrower === url
              ? "UNAVAILABLE"
              : userHashTable[item.borrower].fullname;
        }
        return item;
      });

      const profileObj = {
        fullname: userHashTable[url].fullname,
        bio: userHashTable[url].bio,
        gravatarurl: userHashTable[url].gravatarurl,
        numBorrowedItems: borrowedItems.length,
        // Shared items are items the owner owns
        numSharedItems: combined.length
      };

      dispatch(getProfileSuccess(combined, profileObj));
    })
    .catch(error => dispatch(getProfileError(error.message)));
};

// REDUCERS
export default (state = {}, action) => {
  state = {
    isLoading: false,
    items: [],
    profile: [],
    error: ""
  };

  switch (action.type) {
    case GET_PROFILE_LOADING: {
      // reset error to empty string in case an error manifested prior to loading
      return { ...state, isLoading: true, error: "" };
    }
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: action.items,
        profile: action.profile,
        error: ""
      };
    }
    case GET_PROFILE_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};
