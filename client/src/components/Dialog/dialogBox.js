import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { updateToggleBorrowWindow } from '../../redux/modules/borrow';

const dialogBox = ({ close, isOpen }) => (
    <Dialog
        title="Borrow Item"
        actions={[
            <FlatButton label="Cancel" primary onClick={close(false)} />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onClick={close(false)}
            />
        ]}
        modal={false}
        open={isOpen}
        onRequestClose={close(false)}
    >
        The actions in this window were passed in as an array of React objects.
    </Dialog>
);
const mapStateToProps = state => ({
    isOpen: state.borrow.isOpen
});

const mapDispatchToProps = dispatch => ({
    close(onOrOff) {
        return () => {
            dispatch(updateToggleBorrowWindow(onOrOff));
        };
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(dialogBox);
