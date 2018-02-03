import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import './styles.css';
// import image from '../../images/item-placeholder.jpg';

// largely copy and pasted code from Material-UI site
const ShareItemCard = ({ owner, titleText, descriptionText, imageUrl }) => (
    <Card>
        <CardMedia>
            <img src={imageUrl} width="200" alt="" />
        </CardMedia>
        <Link to={`/profile/${owner}`}>
            <CardHeader
                subtitle={moment().fromNow()}
                avatar="" // {item.itemowner.gravatarurl}
            />
        </Link>
        <CardTitle title={titleText} subtitle="" />
        <CardText>{descriptionText}</CardText>
    </Card>
);

ShareItemCard.propTypes = {
    // item: PropTypes.object.isRequired,
    // owner: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    imageUrl: state.share.imageUrl,
    titleText: state.share.titleText,
    descriptionText: state.share.descriptionText
});

export default connect(mapStateToProps)(ShareItemCard);
