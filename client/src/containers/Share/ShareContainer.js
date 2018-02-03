import React from 'react';
import Share from './Share';
import { withRouter } from 'react-router-dom';
import ShareItemCard from '../../components/ShareItemCard';
import './styles.css';
import { firebaseAuth } from '../../config/firebaseConfig';

const ShareContainer = () => (
    <div className="share-wrapper">
        <div className="share-item-card-wrapper">
            <ShareItemCard owner={`${firebaseAuth.currentUser.uid}`} />
        </div>
        <div>
            <Share />
        </div>
    </div>
);

export default withRouter(ShareContainer);
