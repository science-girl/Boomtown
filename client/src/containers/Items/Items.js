import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import ItemCard from '../../components/ItemCard';
import style from './styles';

const masonryOptions = {
    transitionDuration: 1000,
    columnWidth: 10
};

const Items = ({ list }) => (
    <div style={style.MasonryContainer}>
        <Masonry
            style={style.MasonryContainer}
            options={masonryOptions}
            elementType={'ul'}
        >
            {list.map(item => (
                <li key={item.id} style={style.MasonryList}>
                    <ItemCard item={item} owner={item.itemowner.id} />
                </li>
            ))}
        </Masonry>
    </div>
);

// must be explicit about the propTypes expected in all files
Items.propTypes = {
    list: PropTypes.array.isRequired
};

export default Items;
