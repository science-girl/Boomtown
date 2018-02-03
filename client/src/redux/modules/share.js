const UPDATE_TITLE_FIELD = 'UPDATE_TITLE_FIELD';
const UPDATE_DESCRIPTION_FIELD = 'UPDATE_DESCRIPTION_FIELD';
const UPDATE_IMAGE_FIELD = 'UPDATE_IMAGE_FIELD';

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

export default function (
    state = {
        titleText: DEFAULT_TITLE_TEXT,
        descriptionText: DEFAULT_DESCRIPTION_TEXT,
        imageUrl: '../../images/item-placeholder.jpg'
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
    default:
        return state;
    }
}
