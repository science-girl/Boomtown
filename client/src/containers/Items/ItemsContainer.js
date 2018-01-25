import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchItemsAndUsers } from '../../redux/modules/items';
import Items from './Items';
import Loading from '../../components/Loading';

class ItemsContainer extends Component {
    // propTypes convention for classes
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        items: PropTypes.array.isRequired,
        tagList: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.dispatch(fetchItemsAndUsers());
    }

    //
    // @param list of item objects, hashMap of tags
    // @return a list of items matching the given tags or
    // the original list if no tags are supplied.
    filterTags(list, tags) {
        // check if the tag list is empty; if it is, return the list.
        if (tags.length === 0) {
            return list;
        }
        // otherwise curate a list composed of items matching tags in tags
        // in the case of multiple tags, an item is added to the list once a
        // matching tag has been found.
        return list.filter(item => this.hasTags(item, tags));
    }

    //
    // @param an item and an array of tags to match the item
    // @return the item once one of the item tags matches one of the tags in matchTags
    hasTags(item, matchTags) {
        for (let i = 0; i < item.tags.length; i += 1) {
            // console.log(item.tags[i]);
            if (matchTags.some(tag => tag === item.tags[i])) {
                return item;
            }
        }
    }

    render() {
        return this.props.isLoading ? (
            <Loading />
        ) : (
            <Items
                list={this.filterTags(this.props.items, this.props.tagList)}
            />
        );
    }
}

// Convention is to name mapStateToProps
// retrieve the state from the store and plug it into props for react
const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    items: state.items.items,
    tagList: state.items.tagList,
    error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);
