import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
const ShareButton = () => (
  <div>
    <Link to="/share">
      <FloatingActionButton secondary={true}>
        <ContentAdd />
      </FloatingActionButton>
    </Link>
  </div>
);

export default ShareButton;
