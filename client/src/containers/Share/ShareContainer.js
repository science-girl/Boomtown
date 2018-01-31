import React, { Component } from 'react';
import Share from './Share';
import ShareItemCard from '../../components/ShareItemCard';
import './styles.css';

export default class ShareContainer extends Component {
    render() {
        return (
            <div className="share-wrapper">
                <div className="share-item-card-wrapper">
                    <ShareItemCard owner={'LAi9TYWxgGhbjgHu1Sm6ZvB1tRP2'} />
                </div>
                <div>
                    <Share />
                </div>
            </div>
        );
    }
}
