import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import { getItemTags } from "../../redux/modules/items";

// largely copy and pasted from material-ui

const names = [
  "Electronics",
  "Household Items",
  "Musical Instruments",
  "Physical Media",
  "Recreational Equipment",
  "Sporting Goods",
  "Tools"
];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
class FilterSelection extends Component {
  state = {
    values: []
  };

  handleChange = (event, index, values) => {
    this.setState({ values });
    this.props.dispatch(getItemTags(this.props.items, values));
  };

  menuItems(values) {
    return names.map(name => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const { values } = this.state;
    return (
      <div>
        <SelectField
          multiple={true}
          hintText="Filter by Tag"
          value={values}
          onChange={this.handleChange}
        >
          {this.menuItems(values)}
        </SelectField>
      </div>
    );
  }
}

// Convention is to name mapStateToProps
// retrieve the state from the store and plug it into props for react
const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  tags: state.items.tags,
  error: state.items.error
});

export default connect(mapStateToProps)(FilterSelection);
