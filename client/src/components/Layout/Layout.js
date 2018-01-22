import React from "react";
import PropTypes from "prop-types";
import { Route, Link, withRouter } from "react-router-dom";

import Header from "../HeaderBar";
import Footer from "../Footer/FooterContainer";
import "./styles.css";

const Layout = ({ children }) => (
  <div className="appContentWrapper">
    <div className="appHeader">
      <Header />
    </div>
    <div className="appContent">{children}</div>
    <Route path="/login" children={props => (props.match ? "" : <Footer />)} />
  </div>
);

Layout.defaultProps = {
  children: null
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
