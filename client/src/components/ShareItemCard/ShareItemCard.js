import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import md5 from 'md5';
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import { firebaseAuth } from '../../config/firebaseConfig';

import './styles.css';
import image from '../../images/item-placeholder.jpg';

const GRAVATAR_URL = 'http://gravatar.com/avatar/';

// largely copy and pasted code from Material-UI site
const ShareItemCard = ({ owner, titleText, descriptionText, imageUrl }) => (
    <Card>
        <CardMedia>
            <img src={image || imageUrl} width="200" alt="" />
        </CardMedia>
        <Link to={`/profile/${owner}`}>
            <CardHeader
                subtitle={moment().fromNow()}
                avatar={GRAVATAR_URL + md5(`${firebaseAuth.currentUser.email}`)}
            />
        </Link>
        <CardTitle title={titleText} subtitle="" />
        <CardText>{descriptionText}</CardText>
    </Card>
);

const mapStateToProps = state => ({
    imageUrl: state.share.imageUrl,
    titleText: state.share.titleText,
    descriptionText: state.share.descriptionText
});

export default connect(mapStateToProps)(ShareItemCard);
