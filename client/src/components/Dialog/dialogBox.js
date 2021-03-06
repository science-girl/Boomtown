import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { updateToggleBorrowWindow } from '../../redux/modules/borrow';
import { firebaseAuth } from '../../config/firebaseConfig';

const dialogBox = ({
    close,
    submitBorrow,
    isOpen,
    itemName,
    userName,
    itemId
}) => (
    <Dialog
        title="Borrow Item"
        actions={[
            <FlatButton label="Cancel" primary onClick={close(false)} />,
            <FlatButton
                label="Borrow"
                primary
                keyboardFocused
                onClick={() =>
                    submitBorrow(itemId, `${firebaseAuth.currentUser.uid}`)
                }
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(dialogBox);
