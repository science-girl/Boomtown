import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { getItemTags } from '../../redux/modules/items';

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
class FilterSelection extends Component {
    static menuItems(values, names) {
        return names.map(tag => (
            <MenuItem
                key={tag.id}
                insetChildren
                checked={values && values.indexOf(tag.id) > -1}
                value={tag.id}
                primaryText={tag.title}
            />
        ));
    }

    state = {
        values: []
    };

    handleChange = (event, index, values) => {
        this.setState({ values });
        this.props.dispatch(getItemTags(this.props.items, values));
    };

    render() {
        const { getTagMenu } = this.props.data;
        if (this.props.data.error) {
            return <div>An unexpected error occurred</div>;
        }
        const tags = Object.assign([], getTagMenu);
        const { values } = this.state;

        return (
            <div>
                <SelectField
                    multiple
                    hintText="Filter by Tag"
                    value={values}
                    onChange={this.handleChange}
                >
                    {FilterSelection.menuItems(values, tags)}
                </SelectField>
            </div>
        );
    }
}

// Convention is to name mapStateToProps
// retrieve the state from the store and plug it into props for react
const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    tags: state.items.tags,
    error: state.items.error
});

const getTags = gql`
    query getTagMenu {
        getTagMenu {
            id
            title
        }
    }
`;

export default compose(graphql(getTags), connect(mapStateToProps))(
    FilterSelection
);
