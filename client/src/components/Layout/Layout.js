import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Header from '../HeaderBar';
import Footer from '../Footer';
import './styles.css';

const Layout = ({ children }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            <Route
                exact
                path="/items"
                component={props => (props.match ? <Header /> : '')}
            />
            <Route
                exact
                path="/profile/:userid"
                component={props => (props.match ? <Header /> : '')}
            />
            <Route
                exact
                path="/share"
                component={props => (props.match ? <Header /> : '')}
            />
        </div>
        <div className="appContent">{children}</div>
        <Route
            exact
            path="/login"
            component={props => (props.match ? '' : <Footer />)}
        />
    </div>
);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
