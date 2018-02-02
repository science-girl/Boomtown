import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import {
    updateToggleBorrowWindow,
    submitBorrowInfo
} from '../../redux/modules/borrow';

const dialogBox = ({ close, isOpen, submit, itemName, userName }) => (
    <Dialog
        title="Borrow Item"
        actions={[
            <FlatButton label="Cancel" primary onClick={close(false)} />,
            <FlatButton
                label="Borrow"
                primary
                keyboardFocused
                onClick={submit()}
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
    userName: state.borrow.userName
});

const mapDispatchToProps = dispatch => ({
    close(onOrOff) {
        return () => {
            dispatch(updateToggleBorrowWindow(onOrOff));
        };
    },
    submit() {
        return () => {
            dispatch(submitBorrowInfo());
        };
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(dialogBox);
