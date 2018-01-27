import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'md5';

// import { fetchItemsAndUsers } from '../../redux/modules/profile';
import Profile from './Profile';
import UserCard from '../../components/UserCard';
import ShareButton from '../../components/ShareButton';
import Loading from '../../components/Loading';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './styles.css';
import style from './styles';

const GRAVATAR_URL = 'http://gravatar.com/avatar/';
const fetchUsers = gql`
    query getUser($id: ID) {
        user(id: $id) {
            bio
            email
            fullname
        }
    }
`;

class ProfileContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { loading, user } = this.props.data;
        console.log(user);
        return loading ? (
            <Loading />
        ) : (
            <div className="profileHeader">
                <UserCard
                    bio={user.bio}
                    fullname={user.fullname}
                    gravatarurl={GRAVATAR_URL + md5(`${user.email}`)}
                />
            </div>
        );
    }
}
// <UserCard
//     bio={users.bio}
//     fullname={users.fullname}
//     gravatarurl={users.gravatarurl}
//      numBorrowed={users.numBorrowedItems}
//     numShared={users.numSharedItems}
// />
//  <Profile list={this.props.items} />
// <div style={style.FixedButton}>
//     <ShareButton />
// </div>

export default graphql(fetchUsers, {
    options: props => ({
        variables: {
            id: props.match.params.userid
        }
    })
})(ProfileContainer);

// retrieve the state from the store and plug it into props for react
// const mapStateToProps = state => ({
//     isLoading: state.profile.isLoading,
//     items: state.profile.items,
//     profile: state.profile.profile,
//     error: state.profile.error
// });
