import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Items from './Items';
import Loading from '../../components/Loading';

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
    static propTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array
    };
    render() {
        const { loading, items } = this.props.data;
        console.log(items);

        return loading ? <Loading /> : <Items list={items} />;
    }
}

export default graphql(fetchItems)(ItemsContainer);
