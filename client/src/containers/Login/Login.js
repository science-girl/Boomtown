import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import './styles.css';
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';

const Login = ({
    login,
    handleUpdateEmail,
    handleUpdatePassword,
    emailInputValue,
    emailErrorValue,
    passwordErrorValue,
    passwordInputValue,
    disableSubmit,
    loginError
}) => (
    <div className="page login">
        <div className="logo">
            <img src={logo} alt="Boomtown Logo" />
        </div>
        <div className="topRight">
            <img src={topRight} alt="Sky" />
        </div>
        <div className="bottomLeft">
            <img src={bottomLeft} alt="City" />
        </div>
        <div className="cardContainer">
            <Paper zDepth={5}>
                <div className="formContainer">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            login();
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                label="Email"
                                floatingLabelText="Email"
                                onChange={handleUpdateEmail}
                                value={emailInputValue}
                                type="text"
                                errorText={emailErrorValue}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Password"
                                floatingLabelText="Password"
                                type="password"
                                onChange={handleUpdatePassword}
                                value={passwordInputValue}
                                errorText={passwordErrorValue}
                            />
                        </div>
                        <RaisedButton
                            className="enterButton"
                            onClick={login}
                            primary
                            fullWidth
                            disabled={disableSubmit}
                            type="submit"
                        >
                            Enter
                        </RaisedButton>
                    </form>
                    <div className="loginFormError">{loginError.message}</div>
                </div>
            </Paper>
        </div>
    </div>
);

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default Login;
