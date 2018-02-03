const UPDATE_TITLE_FIELD = 'UPDATE_TITLE_FIELD';
const UPDATE_DESCRIPTION_FIELD = 'UPDATE_DESCRIPTION_FIELD';
const UPDATE_IMAGE_FIELD = 'UPDATE_IMAGE_FIELD';
const RESET_FIELDS = 'RESET_FIELDS';
const TOGGLE_IMAGE_SELECTED = 'TOGGLE_IMAGE_SELECTED';

const DEFAULT_DESCRIPTION_TEXT = 'Profound Item Description';
const DEFAULT_TITLE_TEXT = 'Amazing Item';

export const updateTitleField = titleText => ({
    type: UPDATE_TITLE_FIELD,
    payload: titleText
});
export const updateDescriptionField = descriptionText => ({
    type: UPDATE_DESCRIPTION_FIELD,
    payload: descriptionText
});
export const updateImageField = imageUrl => ({
    type: UPDATE_IMAGE_FIELD,
    payload: imageUrl
});

export const resetFields = () => ({
    type: RESET_FIELDS
});

export const toggleImageSelected = onOrOff => ({
    type: TOGGLE_IMAGE_SELECTED,
    payload: onOrOff
});

export default function (
    state = {
        titleText: DEFAULT_TITLE_TEXT,
        descriptionText: DEFAULT_DESCRIPTION_TEXT,
        imageUrl: '../../images/item-placeholder.jpg',
        imageSelected: false
    },
    action
) {
    switch (action.type) {
    case UPDATE_TITLE_FIELD: {
        return {
            ...state,
            titleText: action.payload ? action.payload : DEFAULT_TITLE_TEXT
        };
    }
    case UPDATE_DESCRIPTION_FIELD: {
        return {
            ...state,
            descriptionText: action.payload
                ? action.payload
                : DEFAULT_DESCRIPTION_TEXT
        };
    }
    case UPDATE_IMAGE_FIELD: {
        console.log('Updating Image Field');
        return {
            ...state,
            imageUrl: action.payload
        };
    }
    case RESET_FIELDS: {
        return {
            ...state,
            titleText: DEFAULT_TITLE_TEXT,
            descriptionText: DEFAULT_DESCRIPTION_TEXT,
            imageUrl: ''
        };
    }
    case TOGGLE_IMAGE_SELECTED: {
        return { ...state, imageSelected: action.payload };
    }
    default:
        return state;
    }
}
