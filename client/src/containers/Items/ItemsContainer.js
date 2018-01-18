import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";

import { fetchItemsAndUsers } from "../../redux/modules/items";
import Items from "./Items";
import style from "./styles.js";

class ItemsContainer extends Component {
  // propTypes convention for classes
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers());
  }

  render() {
    return this.props.isLoading ? (
      <div className="loading">
        <CircularProgress
          size={80}
          thickness={5}
          // {/*color={theme.palette.multicolor}*/}
        />
      </div>
    ) : (
      <Items list={this.props.items} />
    );
  }
}

// Convention is to name mapStateToProps
// retrieve the state from the store and plug it into props for react
const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);
