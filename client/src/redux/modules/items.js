// ACTION TYPES
const GET_ITEMS_LOADING = "GET_ITEMS_LOADING";
const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";

const JSON_ITEM_DB = "http://localhost:3001/items";
const JSON_USER_DB = "http://localhost:3001/users";
const GRAVATAR_URL = "http://gravatar.com/avatar/";
const md5 = require("md5");

// ACTION CREATORS
const getItemsLoading = () => ({ type: "GET_ITEMS_LOADING" });
const getItemsSuccess = items => ({
  type: "GET_ITEMS_SUCCESS",
  payload: items
});
const getItemsError = errorMessage => ({
  type: "GET_ITEMS_ERROR",
  payload: errorMessage
});

// ASYNCH ACTION CREATOR
// curried (partially applied) function that accepts dispatch as a parameter
//
export const fetchItemsAndUsers = () => dispatch => {
  // get the loader spinning
  dispatch(getItemsLoading());
  // Fetch JSON and attach to state
  // Use AJAX to get JSON items from the JSON db
  const items = fetch(JSON_ITEM_DB).then(r => r.json());
  const users = fetch(JSON_USER_DB).then(r => r.json());

  // Merge the two lists together into a single list
  // Attach the new list to state, and apss that list into the ITems component
  return Promise.all([items, users])
    .then(response => {
      const [items, users] = response;

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
          item.borrower = userHashTable[item.borrower].fullname;
        }
        return item;
      });
      dispatch(getItemsSuccess(combined));
    })
    .catch(error => dispatch(getItemsError(error.message)));
};

//MANDI'S CODE
// return Promise.all(
//   [JSON_ITEM_DB, JSON_USER_DB].map(url =>
//     fetch(url).then(response => response.json()),).then(json => {
//       const[items, users] = json;
//       const itemsWithOwnders - items.map(item=> {
//         const itemowner = users.filter(user=> user.id === item.itemowner);
//         item.itemowner = itemowner[0];
//         return item;
//       })
//     })
//   )
// );

// reducers
export default (state = {}, action) => {
  state = {
    isLoading: false,
    items: [],
    error: ""
  };

  switch (action.type) {
    case GET_ITEMS_LOADING: {
      // reset error to empty string in case an error manifested prior to loading
      return { ...state, isLoading: true, error: "" };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, isLoading: false, items: action.payload, error: "" };
    }
    case GET_ITEMS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};
