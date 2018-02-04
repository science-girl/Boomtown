import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Change the props or change the state; can't change state, so change props
// using redux so props below can trigger reactions
const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
    // the spread catches any props that were not defined but passed
    <Route
        {...rest}
        render={props => {
            if (authenticated) {
                return <Component {...props} />;
            }
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                />
            );
        }}
    />
);

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(PrivateRoute);
