const UPDATE_TITLE_FIELD = 'UPDATE_TITLE_FIELD';
const UPDATE_DESCRIPTION_FIELD = 'UPDATE_DESCRIPTION_FIELD';
const UPDATE_IMAGE_FIELD = 'UPDATE_IMAGE_FIELD';

export const updateTitleField = titleText => ({
    type: UPDATE_TITLE_FIELD,
    payload: titleText
});
export const updateDescriptionField = descriptionText => ({
    type: UPDATE_TITLE_FIELD,
    payload: descriptionText
});
export const updateImageField = imageUrl => ({
    type: UPDATE_IMAGE_FIELD,
    payload: imageUrl
});

export default function (
    state = {
        titleText: '',
        descriptionText: '',
        imageUrl: '../../images/item-placeholder.jpg'
    },
    action
) {
    switch (action.type) {
    case UPDATE_TITLE_FIELD: {
        console.log('Updating Title Field');
        return {
            ...state,
            titleText: action.payload
        };
    }
    case UPDATE_DESCRIPTION_FIELD: {
        console.log('Updating Description Field');
        return {
            ...state,
            descriptionText: action.payload
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
