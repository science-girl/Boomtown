import React from "react";

import ItemsContainer from "./ItemsContainer";
import ShareButton from "../../components/Buttons/ShareButton.js";
import style from "./styles.js";

const ItemCardsList = () => {
  return (
    <div style={style.MasonryContainer}>
      <ItemsContainer />
      <div style={style.FixedButton}>
        <ShareButton />
      </div>
    </div>
  );
};

export default ItemCardsList;
