import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { firebaseAuth } from '../../config/firebaseConfig';

import Items from './Items';
import Loading from '../../components/Loading';
import Dialog from '../../components/Dialog';

const fetchItems = gql`
    query {
        items {
            id
            title
            itemowner {
                id
                bio
                email
                fullname
            }
            borrower {
                id
                fullname
            }
            imageurl
            description
            available
            created
            tags {
                title
            }
        }
    }
`;

class ItemsContainer extends Component {
    //
    // @param an item and an array of tags to match the item
    // @return the item once one of the item tags matches one of the tags in matchTags
    hasTags(item, matchTags) {
        for (let i = 0; i < item.tags.length; i += 1) {
            if (matchTags.some(tag => tag === item.tags[i].title)) {
                return item;
            }
        }
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

    render() {
        const { loading, items } = this.props.data;
        if (this.props.data.error) {
            // console.log(this.props.data.error);
            return <div>An unexpected error occurred</div>;
        }

        return loading ? (
            <Loading />
        ) : (
            <div>
                {this.props.isOpen && <Dialog />}
                <Items
                    list={this.filterTags(
                        items,
                        this.props.tagList,
                        firebaseAuth.currentUser.uid
                    )}
                />
            </div>
        );
    }
}

ItemsContainer.PropTypes = {
    loading: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
};

// retrieve the state from the store and plug it into props for react
const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    tagList: state.items.tagList,
    error: state.items.error,
    isOpen: state.borrow.isOpen
});

export default compose(graphql(fetchItems), connect(mapStateToProps))(
    ItemsContainer
);
