import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import md5 from 'md5';
import moment from 'moment';
import style from './styles';

import { updateToggleBorrowWindow } from '../../redux/modules/borrow';
// import Dialog from '../../components/Dialog';

const GRAVATAR_URL = 'http://gravatar.com/avatar/';

// largely copy and pasted code from Material-UI site
const ItemCard = ({ item, owner, loggedInUser, dispatch }) => (
    <Card>
        <CardMedia>
            <img src={item.imageurl} alt="" />
        </CardMedia>
        {item.borrower !== null && (
            <CardMedia
                overlayContentStyle={style.CardText}
                overlay={
                    <CardTitle
                        subtitle={
                            loggedInUser === `${owner}`
                                ? `Lent to ${item.borrower.fullname}`
                                : 'UNAVAILABLE'
                        }
                    />
                }
            />
        )}
        <Link to={`/profile/${owner}`}>
            <CardHeader
                title={item.itemowner.fullname}
                subtitle={moment(item.created).fromNow()}
                avatar={GRAVATAR_URL + md5(`${item.itemowner.email}`)}
            />
        </Link>
        <CardTitle
            title={item.title}
            subtitle={item.tags.map(tag => `${tag.title}`).join()}
        />
        <CardText>{item.description}</CardText>
        {/* Only show the 'Borrow' button when not on the logged in user's profile page
    Only show the 'Borrow' button when the item hasn't been loaned */}
        {item.borrower === null &&
            item.itemowner.id !== { loggedInUser } && (
                <CardActions>
                    <RaisedButton
                        backgroundColor="#263238"
                        labelColor="#ffffff"
                        label="Borrow"
                        onClick={() =>
                            dispatch(
                                updateToggleBorrowWindow(
                                    true,
                                    item.id,
                                    item.itemowner.fullname,
                                    item.title
                                )
                            )
                        }
                    />
                </CardActions>
            )}
    </Card>
);

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    owner: PropTypes.string.isRequired
};
const mapDispatchToProps = dispatch => ({
    updateToggleBorrowWindow: (onOrOff, itemId, userName, itemName) => {
        dispatch(updateToggleBorrowWindow(onOrOff, itemId, userName, itemName));
    }
});

export default connect(mapDispatchToProps)(ItemCard);
