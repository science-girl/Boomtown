import React from "react";
import image from "../../images/grumpy.svg";

const NotFound = () => (
  <div className="notFoundWrapper">
    <img
      src={image}
      height="290"
      width="500"
      alt="Grumpy cat says nope, not found"
    />
    <p>Nope</p>
  </div>
);

export default NotFound;
