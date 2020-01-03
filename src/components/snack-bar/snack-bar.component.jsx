import React from "react";
import ReactSnackBar from "react-js-snackbar";

import "./snack-bar.styles.scss";

const SnackBar = ({ Show, msg }) => (
  <div>
    <ReactSnackBar Show={Show}>{msg}</ReactSnackBar>
  </div>
);

export default SnackBar;
