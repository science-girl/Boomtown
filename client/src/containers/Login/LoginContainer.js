import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { firebaseAuth } from '../../config/firebaseConfig';
import Login from './Login';

class LoginContainer extends Component {
    static propTypes = {
        // login: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            emailInputValue: '',
            passwordInputValue: ''
        };
    }
    handleUpdateEmail = ({ target: { value } }) => {
        this.setState({ emailInputValue: value });
    };
    handleUpdatePassword = ({ target: { value } }) => {
        this.setState({ passwordInputValue: value });
    };

    login = () => {
        if (this.state.emailInputValue && this.state.passwordInputValue) {
            firebaseAuth
                .signInWithEmailAndPassword(
                    this.state.emailInputValue,
                    this.state.passwordInputValue
                )
                .then(args => {
                    console.log(`success: ${args}`);
                    this.props.history.push('/items');
                })
                .catch(error => {
                    console.log('error', error);
                });
        }
    };
    render() {
        return (
            <Login
                login={this.login}
                emailInputValue={this.state.emailInputValue}
                passwordInputValue={this.state.passwordInputValue}
                handleUpdateEmail={this.handleUpdateEmail}
                handleUpdatePassword={this.handleUpdatePassword}
            />
        );
    }
}

export default LoginContainer;
