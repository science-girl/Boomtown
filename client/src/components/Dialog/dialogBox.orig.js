import React from 'react';
import gql from 'graphql-tag';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import {
    updateToggleBorrowWindow,
    submitBorrowInfo
} from '../../redux/modules/borrow';
import { firebaseAuth } from '../../config/firebaseConfig';

const dialogBox = ({ close, isOpen, submit, itemName, userName, itemId }) => (
    <Dialog
        title="Borrow Item"
        actions={[
            <FlatButton label="Cancel" primary onClick={close(false)} />,
            <FlatButton
                label="Borrow"
                primary
                keyboardFocused
                onClick={() => {
                    submit(itemId, `${firebaseAuth.currentUser.uid}`);
                }}
            />
        ]}
        modal={false}
        open={isOpen}
        onRequestClose={close(false)}
    >
        Would you like to borrow this {itemName} from {userName}?
    </Dialog>
);
const mapStateToProps = state => ({
    isOpen: state.borrow.isOpen,
    itemName: state.borrow.itemName,
    userName: state.borrow.userName,
    itemId: state.borrow.itemId
});

const mapDispatchToProps = dispatch => ({
    close(onOrOff) {
        return () => {
            dispatch(updateToggleBorrowWindow(onOrOff));
        };
    },
    updateBorrowerInfo() {
        return () => {
            console.log('updateBorrowerInfo');
            dispatch(submitBorrowInfo());
        };
    }
});

const borrow = gql`
    mutation updateItem($id: ID, $borrower: ID) {
        updateItem(newItem: { id: $id, borrower: $borrower }) {
            id
        }
    }
`;

export default compose(
    graphql(borrow, {
        props: ({ mutate }) => ({
            submit: (id, borrower) => mutate({ variables: { id, borrower } })
        })
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(dialogBox);
