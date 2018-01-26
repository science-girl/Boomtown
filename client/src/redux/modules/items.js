// ACTION TYPES
const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
const GET_ITEM_TAGS = 'GET_ITEM_TAGS';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

const JSON_ITEM_DB = 'http://localhost:3001/items';
const JSON_USER_DB = 'http://localhost:3001/users';
const GRAVATAR_URL = 'http://gravatar.com/avatar/';
const md5 = require('md5');

// TODO: remove dummy data once oath is in place
const LOGGED_IN_USER = 'LAi9TYWxgGhbjgHu1Sm6ZvB1tRP2';

// ACTION CREATORS
const getItemsLoading = () => ({ type: 'GET_ITEMS_LOADING' });
export const getItemsSuccess = items => ({
    type: 'GET_ITEMS_SUCCESS',
    payload: items
});
const getItemsError = errorMessage => ({
    type: 'GET_ITEMS_ERROR',
    payload: errorMessage
});
export const getItemTags = (items, tagList) => ({
    type: 'GET_ITEM_TAGS',
    payload: tagList,
    items
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
            const [itemList, userList] = response;

            const userHashTable = {};
            for (let index = 0; index < userList.length; index += 1) {
                // create a md5 hash to access gravatar info
                const gravatarUrl = GRAVATAR_URL.concat(
                    md5(userList[index].email)
                );

                // set user data in a hashmap
                userHashTable[userList[index].id] = {
                    id: userList[index].id,
                    email: userList[index].email,
                    fullname: userList[index].fullname,
                    bio: userList[index].bio,
                    gravatarurl: gravatarUrl
                };
            }

            // need to create an array of tags
            itemList.forEach(item => {
                const tagArray = [];
                item.tags.forEach(tag => {
                    tagArray.push(tag.title);
                });
                item.tags = tagArray;
            });

            const combined = itemList.map(item => {
                const ownerKey = item.itemowner;
                item.itemowner = userHashTable[ownerKey];
                if (item.borrower !== null && item !== undefined) {
                    // item is 'UNAVAILABLE' if the item doesn't belong to the current owner
                    item.borrower =
                        item.itemowner.id !== LOGGED_IN_USER
                            ? 'UNAVAILABLE'
                            : `Lent to ${
                                userHashTable[item.borrower].fullname
                            }`;
                }
                return item;
            });
            dispatch(getItemsSuccess(combined));
        })
        .catch(error => dispatch(getItemsError(error.message)));
};

// REDUCERS
export default (state = {}, action) => {
    state = {
        isLoading: false,
        items: [],
        tagList: [],
        error: ''
    };

    switch (action.type) {
    case GET_ITEMS_LOADING: {
        // reset error to empty string in case an error manifested prior to loading
        return { ...state, isLoading: true, error: '' };
    }
    case GET_ITEMS_SUCCESS: {
        return {
            ...state,
            isLoading: false,
            items: action.payload,
            error: ''
        };
    }
    case GET_ITEMS_ERROR: {
        return { ...state, isLoading: true, error: action.payload };
    }
    case GET_ITEM_TAGS: {
        return {
            ...state,
            isLoading: false,
            items: action.items,
            tagList: action.payload,
            error: ''
        };
    }
    default:
        return state;
    }
};
