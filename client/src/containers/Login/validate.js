//
// @param an empty String or String that may be a valid or invalid email address
// @return an empty String if the email is valid;
// otherwise an appropriate error message
export function validateEmail(value) {
    if (!value) {
        return 'Required';
    }
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address';
    }
    return '';
}
//
// @param an empty String or a String representing a password
// @return an empty String if the password is valid;
// otherwise an appropriate error message.
export function validatePassword(value) {
    if (!value) {
        return 'Required';
    }
    if (value.length < 6) {
        return 'Passwords require a minimum of 6 characters';
    }
    return '';
}
