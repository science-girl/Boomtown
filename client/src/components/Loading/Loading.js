import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import "./styles.css";

export const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress size={80} thickness={5} />
    </div>
  );
};
