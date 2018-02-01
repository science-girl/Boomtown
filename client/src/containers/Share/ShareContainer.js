import React, { Component } from 'react';
import Share from './Share';
import ShareItemCard from '../../components/ShareItemCard';
import './styles.css';
import { firebaseAuth } from '../../config/firebaseConfig';

export default class ShareContainer extends Component {
    render() {
        return (
            <div className="share-wrapper">
                <div className="share-item-card-wrapper">
                    <ShareItemCard owner={'firebaseAuth.currentUser.uid'} />
                </div>
                <div>
                    <Share />
                </div>
            </div>
        );
    }
}
