import React from 'react';

import ItemsContainer from './ItemsContainer';
import ShareButton from '../../components/ShareButton';
import style from './styles';

const ItemCardsList = () => (
    <div style={style.MasonryContainer}>
        <ItemsContainer />
        <div style={style.FixedButton}>
            <ShareButton />
        </div>
    </div>
);

export default ItemCardsList;
