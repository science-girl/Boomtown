const TOGGLE_BORROW_DIALOG = 'TOGGLE_BORROW_DIALOG';
const UPDATE_BORROW_INFO = 'UPDATE_BORROW_INFO';
const TOGGLE_OPEN_BORROW_WINDOW = 'TOGGLE_OPEN_BORROW_WINDOW';

export const updateToggleBorrowWindow = isOpen => ({
    type: TOGGLE_OPEN_BORROW_WINDOW,
    payload: isOpen
});

export const updateToggleBorrowDialog = isBorrow => ({
    type: TOGGLE_BORROW_DIALOG,
    payload: isBorrow
});

export const updateBorrowInfo = (name, itemName) => ({
    type: UPDATE_BORROW_INFO,
    name,
    itemName
});

export default function (
    state = {
        isBorrow: false,
        name: '',
        itemName: '',
        isOpen: false,
        itemId: ''
    },
    action
) {
    switch (action.type) {
    case TOGGLE_BORROW_DIALOG: {
        console.log(`borrow ${action.payload}`);
        return { ...state, isBorrow: action.payload };
    }
    case UPDATE_BORROW_INFO: {
        return { ...state, name: action.name, itemName: action.itemName };
    }
    case TOGGLE_OPEN_BORROW_WINDOW: {
        console.log(`window toggle${action.payload}`);
        return { ...state, isOpen: action.payload, isBorrow: false };
    }
    default:
        return state;
    }
}
