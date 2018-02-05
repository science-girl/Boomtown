import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import store from '../../redux/store';
import { submitBorrowInfo } from '../../redux/modules/borrow';
import Dialog from '../../components/Dialog';

class BorrowContainer extends Component {
    constructor() {
        super();
        this.borrowItem = this.borrowItem.bind(this);
    }

    borrowItem = async (id, borrower) => {
        await this.props
            .mutate({
                variables: {
                    id,
                    borrower
                }
            })
            .then(
                (/* in case we want to show the user what was added: { data } */) => {
                    store.dispatch(submitBorrowInfo());
                    // direct user to items page
                    this.props.history.push('/items');
                }
            )
            .catch(error => error.message);
    };

    render() {
        return (
            <div>
                {this.props.isOpen && <Dialog submitBorrow={this.borrowItem} />}
            </div>
        );
    }
}

const borrow = gql`
    mutation updateItem($id: ID, $borrower: ID) {
        updateItem(newItem: { id: $id, borrower: $borrower }) {
            id
        }
    }
`;

const mapStateToProps = state => ({
    isOpen: state.borrow.isOpen
});

export default compose(graphql(borrow), connect(mapStateToProps))(
    withRouter(BorrowContainer)
);
