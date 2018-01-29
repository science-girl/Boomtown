import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import md5 from 'md5';

import Profile from './Profile';
import UserCard from '../../components/UserCard';
import ShareButton from '../../components/ShareButton';
import Loading from '../../components/Loading';
import './styles.css';
import style from './styles';

const GRAVATAR_URL = 'http://gravatar.com/avatar/';
const fetchUsers = gql`
    query getUser($id: ID) {
        user(id: $id) {
            bio
            email
            fullname
            borroweditems {
                id
            }
            shareditems {
                id
                title
                imageurl
                description
                available
                created
                tags {
                    title
                }
                borrower {
                    id
                    fullname
                }
                itemowner {
                    id
                    bio
                    email
                    fullname
                }
            }
        }
    }
`;

class ProfileContainer extends Component {
    render() {
        const { loading, user } = this.props.data;

        return loading ? (
            <Loading />
        ) : (
            <div className="profileHeader">
                <UserCard
                    bio={user.bio}
                    fullname={user.fullname}
                    gravatarurl={GRAVATAR_URL + md5(`${user.email}`)}
                    numShared={user.shareditems ? user.shareditems.length : 0}
                    numBorrowed={
                        user.borroweditems ? user.borroweditems.length : 0
                    }
                />
                <Profile list={user.shareditems} />
                <div style={style.FixedButton}>
                    <ShareButton />
                </div>
            </div>
        );
    }
}

ProfileContainer.PropTypes = {
    loading: PropTypes.bool,
    items: PropTypes.array
};

export default graphql(fetchUsers, {
    options: props => ({
        variables: {
            id: props.match.params.userid
        }
    })
})(ProfileContainer);
