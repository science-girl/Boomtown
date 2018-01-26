import React from 'react';
import { Link } from 'react-router-dom';

// import moment from 'moment';

import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import './styles.css';

import image from '../../images/item-placeholder.jpg';

// TODO: remove dummy data once oath is in place
// const LOGGED_IN_USER = 'eEvh1WUF5nb5eeUksUQb3Ph0kOU2';

// largely copy and pasted code from Material-UI site
const ShareItemCard = ({ owner }) => (
    <Card>
        <CardMedia>
            <img src={image} width="200" alt="" />
        </CardMedia>
        <Link to={`/profile/${owner}`}>
            <CardHeader
                subtitle="A few seconds ago" // {moment(item.created).fromNow()}
                avatar="" // {item.itemowner.gravatarurl}
            />
        </Link>
        <CardTitle title="" subtitle="" />
        <CardText>tbd</CardText>
    </Card>
);

ShareItemCard.propTypes = {
    // item: PropTypes.object.isRequired,
    // owner: PropTypes.string.isRequired
};

export default ShareItemCard;
