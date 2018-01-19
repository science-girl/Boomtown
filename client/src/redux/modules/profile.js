const GET_ITEMS_LOADING = "GET_ITEMS_LOADING";
const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";

const JSON_ITEM_DB = "http://localhost:3001/items";
const JSON_USER_DB = "http://localhost:3001/users";
const GRAVATAR_URL = "http://gravatar.com/avatar/";
const md5 = require("md5");

// ACTION TYPES
const getItemsLoading = () => ({ type: "GET_ITEMS_LOADING" });
const getItemsSuccess = items => ({
  type: "GET_ITEMS_SUCCESS",
  payload: items
});
const getItemsError = errorMessage => ({
  type: "GET_ITEMS_ERROR",
  payload: errorMessage
});

// ACTION CREATORS

// ASYNCH ACTION CREATOR
// curried (partially applied) function that accepts dispatch as a parameter
//

// REDUCERS
