import { combineReducers } from 'redux';
import itemsReducer from './modules/items';
import profileReducer from './modules/profile';
import authReducer from './modules/auth';
import borrowReducer from './modules/borrow';
import shareReducer from './modules/share';

export default combineReducers({
    items: itemsReducer,
    profile: profileReducer,
    auth: authReducer,
    borrow: borrowReducer,
    share: shareReducer
});
