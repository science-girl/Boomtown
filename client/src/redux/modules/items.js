// ACTION TYPES
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
const GET_ITEM_TAGS = 'GET_ITEM_TAGS';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

// ACTION CREATORS
export const getItemsSuccess = items => ({
    type: 'GET_ITEMS_SUCCESS',
    payload: items
});
export const getItemTags = (items, tagList) => ({
    type: 'GET_ITEM_TAGS',
    payload: tagList,
    items
});

// REDUCERS
export default (state = {}, action) => {
    state = {
        isLoading: false,
        items: [],
        tagList: [],
        error: ''
    };

    switch (action.type) {
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
