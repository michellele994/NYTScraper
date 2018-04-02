import React from "react";

export const FormBtn = props => (
  <button {...props} className="results-button">
    {props.children}
  </button>
);
