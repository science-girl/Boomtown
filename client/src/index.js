import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";
import muiTheme from "./config/theme";

import Layout from "./components/Layout";
import Login from "./containers/Login";
import Items from "./containers/Items/ItemCardsList";
import NotFound from "./containers/NotFound";
import Profile from "./containers/Profile/ProfileContainer";

const Boomtown = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Layout>
            <Switch>
              <Route exact path="/" component={Items} />
              <Route exact path="/items" component={Items} />
              <Route exact path="/profile/:userid" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

// When these are implmented put in Route
// <Route exact path="/profile/:userid" component={} />
// <Route exact path="/share" component={} />
//

ReactDOM.render(<Boomtown />, document.getElementById("root"));
registerServiceWorker();
