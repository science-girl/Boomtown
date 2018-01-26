import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import FilterContainer from '../Filter';

import image from '../../images/boomtown-logo.svg';
import style from './styles';

// largely copy and pasted from material-ui

// TODO: remove dummy data once oath is in place
const LOGGED_IN_USER = 'LAi9TYWxgGhbjgHu1Sm6ZvB1tRP2';

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
                    <Link to={`/profile/${LOGGED_IN_USER}`}>
                        <RaisedButton label="My Profile" primary />
                    </Link>{' '}
                    <RaisedButton
                        label="Logout"
                        secondary
                        onClick={() => history.push('/login')}
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
