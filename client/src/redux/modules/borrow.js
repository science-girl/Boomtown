const TOGGLE_OPEN_BORROW_WINDOW = 'TOGGLE_OPEN_BORROW_WINDOW';
const SUBMIT_BORROW_INFO = 'SUBMIT_BORROW_INFO';
const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export const closeWindow = isOpen => ({
    type: TOGGLE_DIALOG,
    payload: isOpen
});
export const updateToggleBorrowWindow = (
    isOpen,
    itemId,
    userName,
    itemName
) => ({
    type: TOGGLE_OPEN_BORROW_WINDOW,
    itemId,
    userName,
    itemName,
    payload: isOpen
});

export const submitBorrowInfo = () => ({
    type: SUBMIT_BORROW_INFO
});

export default function (
    state = {
        userName: '',
        itemName: '',
        isOpen: false,
        itemId: ''
    },
    action
) {
    switch (action.type) {
    case SUBMIT_BORROW_INFO: {
        return {
            ...state,
            isOpen: false,
            userName: '',
            itemId: '',
            itemName: ''
        };
    }
    case TOGGLE_DIALOG: {
        return { ...state, isOpen: action.payload };
    }
    case TOGGLE_OPEN_BORROW_WINDOW: {
        return {
            ...state,
            isOpen: action.payload,
            userName: action.userName,
            itemId: action.itemId,
            itemName: action.itemName
        };
    }
    default:
        return state;
    }
}
