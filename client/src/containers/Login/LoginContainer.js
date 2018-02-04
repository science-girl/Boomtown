import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebaseConfig';
import { validateEmail, validatePassword } from './validate';
import Login from './Login';

class LoginContainer extends Component {
    constructor() {
        super();
        this.state = {
            emailInputValue: '',
            emailErrorValue: '',
            passwordInputValue: '',
            passwordErrorValue: '',
            disableSubmit: false,
            loginError: { message: '' }
        };
    }
    handleUpdateEmail = ({ target: { value } }) => {
        const error = validateEmail(value);
        this.setState({
            emailInputValue: value,
            emailErrorValue: validateEmail(value),
            disableSubmit: error.length > 0
        });
    };
    handleUpdatePassword = ({ target: { value } }) => {
        const error = validatePassword(value);

        this.setState({
            passwordInputValue: value,
            passwordErrorValue: validatePassword(value),
            disableSubmit: error.length > 0
        });
    };

    login = () => {
        if (this.state.emailInputValue && this.state.passwordInputValue) {
            firebaseAuth
                .signInWithEmailAndPassword(
                    this.state.emailInputValue,
                    this.state.passwordInputValue
                )
                .catch(error => {
                    this.setState({ loginError: error });
                });
        }
    };
    render() {
        const { from } = this.props.location.state || {
            from: { pathname: '/items' }
        };
        return !this.props.authenticated ? (
            <Login
                login={this.login}
                emailInputValue={this.state.emailInputValue}
                emailErrorValue={this.state.emailErrorValue}
                passwordInputValue={this.state.passwordInputValue}
                passwordErrorValue={this.state.passwordErrorValue}
                disableSubmit={this.state.disableSubmit}
                handleUpdateEmail={this.handleUpdateEmail}
                handleUpdatePassword={this.handleUpdatePassword}
                loginError={this.state.loginError}
            />
        ) : (
            <Redirect to={from} />
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    userLoading: state.auth.userLoading
});
export default connect(mapStateToProps)(LoginContainer);
