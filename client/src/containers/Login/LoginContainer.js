import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebaseConfig';
import Login from './Login';

class LoginContainer extends Component {
    constructor() {
        super();
        this.state = {
            emailInputValue: '',
            passwordInputValue: '',
            loginError: { message: '' }
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
                passwordInputValue={this.state.passwordInputValue}
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
