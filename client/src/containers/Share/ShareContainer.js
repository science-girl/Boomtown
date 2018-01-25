import React, { Component } from 'react';
import Share from './Share';
import ShareItemCard from '../../components/ShareItemCard';
import './styles.css';

export default class ShareContainer extends Component {
    render() {
        return (
            <div className="share-wrapper">
                <ShareItemCard />
                <Share />
            </div>
        );
    }
}
