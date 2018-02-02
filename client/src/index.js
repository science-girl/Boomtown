import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { firebaseAuth } from './config/firebaseConfig';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import client from './config/apolloClient';
import { updateAuthState, userLoading } from './redux/modules/auth';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';
import Login from './containers/Login';
import Items from './containers/Items';
import NotFound from './containers/NotFound';
import Profile from './containers/Profile';
import Share from './containers/Share';
import PrivateRoute from './components/ValidatedTextField/PrivateRoute';

let gotProfile = false;
store.subscribe(() => {
    const values = store.getState();
    if (values.authenticated !== 'LOADING_USER' && !gotProfile) {
        gotProfile = true;
        store.dispatch(userLoading(false));
    }
});

firebaseAuth.onAuthStateChanged(user => {
    if (user) {
        store.dispatch(updateAuthState(user));
    } else {
        store.dispatch(updateAuthState(false));
    }
});

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    {/* TODO add history here history={history} in Router */}
                    <div>
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <PrivateRoute
                                    exact
                                    path="/items"
                                    component={Items}
                                />
                                <PrivateRoute
                                    exact
                                    path="/share"
                                    component={Share}
                                />
                                <PrivateRoute
                                    exact
                                    path="/profile/:userid"
                                    component={Profile}
                                />
                                <PrivateRoute path="*" component={NotFound} />
                            </Switch>
                        </Layout>
                    </div>
                </Router>
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
);

// When these are implmented put in Route
// <Route exact path="/profile/:userid" component={} />
// <Route exact path="/share" component={} />
//

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
