import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from '../Loading';
import Header from '../HeaderBar';

import Footer from '../Footer';
import './styles.css';

const Layout = ({ children, userLoading, authenticated }) =>
    (userLoading ? (
        <div>
            <Loader />
        </div>
    ) : (
        <div className="appContentWrapper">
            <div className="appHeader">{authenticated && <Header />}</div>

            <div className="appContent">{children}</div>
            <div>{authenticated && <Footer />}</div>
        </div>
    ));

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

const mapStateToProps = state => ({
    userLoading: state.auth.userLoading,
    authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps)(Layout));
