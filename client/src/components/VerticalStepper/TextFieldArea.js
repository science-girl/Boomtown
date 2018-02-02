import React from 'react';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';

const TextFieldArea = () => (
    <div>
        <TextField hintText="Add a Title" />
        <br />
        <br />
        <TextField hintText="Tell us about your item!" />
        <br />
    </div>
);

export default TextFieldArea;
