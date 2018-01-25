const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

const JSON_ITEM_DB = 'http://localhost:3001/items';
const JSON_USER_DB = 'http://localhost:3001/users';
const GRAVATAR_URL = 'http://gravatar.com/avatar/';
const GRAVATAR_IMG_SIZE = '?s=180';
const md5 = require('md5');

// TODO: remove dummy data once oath is in place
const LOGGED_IN_USER = 'eEvh1WUF5nb5eeUksUQb3Ph0kOU2';

// ACTION TYPES
const getProfileLoading = () => ({ type: 'GET_PROFILE_LOADING' });
const getProfileSuccess = (items, profile) => ({
    type: 'GET_PROFILE_SUCCESS',
    items,
    profile
});

const getProfileError = errorMessage => ({
    type: 'GET_PROFILE_ERROR',
    payload: errorMessage
});

// ASYNCH ACTION CREATOR
// (partially applied) function that accepts dispatch as a parameter
//
export const fetchItemsAndUsers = props => dispatch => {
    // get the loader spinning
    dispatch(getProfileLoading());

    let url = props.match.url;
    url = url.substr(url.lastIndexOf('/') + 1, url.length);

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
            const [itemList, userList, borrowedItemList] = response;

            const userHashTable = {};
            for (let index = 0; index < userList.length; index += 1) {
                // create a md5 hash to access gravatar info
                const gravatarUrl = GRAVATAR_URL.concat(
                    md5(userList[index].email)
                ).concat(GRAVATAR_IMG_SIZE);

                // set user data in a hashmap
                userHashTable[userList[index].id] = {
                    id: userList[index].id,
                    email: userList[index].email,
                    fullname: userList[index].fullname,
                    bio: userList[index].bio,
                    gravatarurl: gravatarUrl
                };
            }

            const combined = itemList.map(item => {
                const ownerKey = item.itemowner;
                item.itemowner = userHashTable[ownerKey];
                // while viewing a profile other than the logged in user,
                // shows 'unavailable' for lent items not belonging to the logged-in user
                if (
                    !item.available &&
                    item !== undefined &&
                    url === LOGGED_IN_USER
                ) {
                    item.borrower = `Lent to ${
                        userHashTable[item.borrower].fullname
                    }`;
                } else if (url !== LOGGED_IN_USER && !item.available) {
                    item.borrower = 'Unavailable';
                }
                return item;
            });

            const profileObj = {
                fullname: userHashTable[url].fullname,
                bio: userHashTable[url].bio,
                gravatarurl: userHashTable[url].gravatarurl,
                numBorrowedItems: borrowedItemList.length,
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
        error: ''
    };

    switch (action.type) {
    case GET_PROFILE_LOADING: {
        // reset error to empty string in case an error manifested prior to loading
        return { ...state, isLoading: true, error: '' };
    }
    case GET_PROFILE_SUCCESS: {
        return {
            ...state,
            isLoading: false,
            items: action.items,
            profile: action.profile,
            error: ''
        };
    }
    case GET_PROFILE_ERROR: {
        return { ...state, isLoading: true, error: action.payload };
    }
    default:
        return state;
    }
};
