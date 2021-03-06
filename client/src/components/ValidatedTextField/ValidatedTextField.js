import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import { blueGrey900 } from 'material-ui/styles/colors';

const styles = {
    fieldStyle: {
        width: '100%'
    },
    errorStyle: {
        color: blueGrey900,
        position: 'absolute',
        bottom: '-0.42rem'
    },
    underlineStyle: {
        borderColor: blueGrey900
    }
};

const ValidatedTextField = ({ label, handleChange, value, type }) => (
    <TextField
        type={type}
        style={styles.fieldStyle}
        floatingLabelText={label}
        errorStyle={styles.errorStyle}
        underlineFocusStyle={styles.underlineStyle}
        onChange={handleChange}
        value={value}
    />
);

ValidatedTextField.propTypes = {
    label: PropTypes.string.isRequired
};

export default ValidatedTextField;
