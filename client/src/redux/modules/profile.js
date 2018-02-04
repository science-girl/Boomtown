// const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
// const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
// const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';
//
// // ACTION TYPES
// const getProfileLoading = () => ({ type: 'GET_PROFILE_LOADING' });
// const getProfileSuccess = (items, profile) => ({
//     type: 'GET_PROFILE_SUCCESS',
//     items,
//     profile
// });
//
// const getProfileError = errorMessage => ({
//     type: 'GET_PROFILE_ERROR',
//     payload: errorMessage
// });
//
// // REDUCERS
// export default (state = {}, action) => {
//     state = {
//         isLoading: false,
//         items: [],
//         profile: [],
//         error: ''
//     };
//
//     switch (action.type) {
//     case GET_PROFILE_LOADING: {
//         // reset error to empty string in case an error manifested prior to loading
//         return { ...state, isLoading: true, error: '' };
//     }
//     case GET_PROFILE_SUCCESS: {
//         return {
//             ...state,
//             isLoading: false,
//             items: action.items,
//             profile: action.profile,
//             error: ''
//         };
//     }
//     case GET_PROFILE_ERROR: {
//         return { ...state, isLoading: true, error: action.payload };
//     }
//     default:
//         return state;
//     }
// };
