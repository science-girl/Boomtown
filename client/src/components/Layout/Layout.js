import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import Header from "../HeaderBar";
import Footer from "../Footer/FooterContainer";
import "./styles.css";

const Layout = ({ children }) => (
  <div className="appContentWrapper">
    <div className="appHeader">
      <Route
        exact
        path="/items"
        children={props => (props.match ? <Header /> : "")}
      />
      <Route
        exact
        path="/profile/:userid"
        children={props => (props.match ? <Header /> : "")}
      />
    </div>
    <div className="appContent">{children}</div>
    <Route
      exact
      path="/login"
      children={props => (props.match ? "" : <Footer />)}
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
