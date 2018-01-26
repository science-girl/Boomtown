import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import client from './config/apolloClient';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';
import Login from './containers/Login';
import Items from './containers/Items';
import NotFound from './containers/NotFound';
import Profile from './containers/Profile';
import Share from './containers/Share';

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    {/* add history here history={history} in Router */}
                    <div>
                        <Layout>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/" component={Items} />
                                <Route exact path="/items" component={Items} />
                                <Route exact path="/share" component={Share} />
                                <Route
                                    exact
                                    path="/profile/:userid"
                                    component={Profile}
                                />
                                <Route path="*" component={NotFound} />
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
