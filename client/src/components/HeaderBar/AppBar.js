import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebaseConfig';

import FilterContainer from '../Filter';

import image from '../../images/boomtown-logo.svg';
import style from './styles';

// largely copy and pasted from material-ui

const AppsBar = ({ history }) => (
    <AppBar
        style={style.NavigationBar}
        iconElementLeft={
            <img
                style={style.imageLogo}
                src={image}
                alt="boomtown icon"
                onClick={() => history.push('/items')}
            />
        }
        title={
            <div style={style.filterWrapper}>
                <Route exact path="/items" component={FilterContainer} />
            </div>
        }
        iconElementRight={
            <div className="headerButtonWrapper">
                <div>
                    <Link to={`/profile/${firebaseAuth.currentUser.uid}`}>
                        <RaisedButton label="My Profile" primary />
                    </Link>{' '}
                    <RaisedButton
                        label="Logout"
                        secondary
                        onClick={() => firebaseAuth.signOut()}
                    />
                </div>
            </div>
        }
    />
);

AppsBar.propTypes = {
    // match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(AppsBar);
