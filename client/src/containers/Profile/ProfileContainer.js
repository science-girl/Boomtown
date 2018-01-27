import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { fetchItemsAndUsers } from '../../redux/modules/profile';
import Profile from './Profile';
import UserCard from '../../components/UserCard';
import ShareButton from '../../components/ShareButton';
import Loading from '../../components/Loading';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './styles.css';
import style from './styles';

const fetchUsers = gql`
    query {
        users {
            id
            fullname
            email
            bio
        }
    }
`;

class ProfileContainer extends Component {
    // static PropTypes = {
    //     isLoading: PropTypes.bool.isRequired,
    //     items: PropTypes.array.isRequired,
    //     dispatch: PropTypes.func.isRequired,
    //     profile: PropTypes.object.isRequired
    // };

    // componentDidMount() {
    //     this.props.dispatch(fetchItemsAndUsers(this.props));
    // }

    render() {
        return this.props.isLoading ? (
            <Loading />
        ) : (
            <div>Hi</div>
            // <div className="profileHeader">
            //     <UserCard
            //         bio={this.props.profile.bio}
            //         fullname={this.props.profile.fullname}
            //         gravatarurl={this.props.profile.gravatarurl}
            //         numBorrowed={this.props.profile.numBorrowedItems}
            //         numShared={this.props.profile.numSharedItems}
            //     />
            //     <Profile list={this.props.items} />
            //     <div style={style.FixedButton}>
            //         <ShareButton />
            //     </div>
            // </div>
        );
    }
}

export default graphql(fetchUsers)(ProfileContainer);

// retrieve the state from the store and plug it into props for react
// const mapStateToProps = state => ({
//     isLoading: state.profile.isLoading,
//     items: state.profile.items,
//     profile: state.profile.profile,
//     error: state.profile.error
// });
